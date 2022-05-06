using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Pims.Core.Extensions;
using Pims.Dal.Entities;
using Pims.Dal.Entities.Models;
using Pims.Dal.Helpers.Extensions;
using Pims.Dal.Security;

namespace Pims.Dal.Repositories
{
    /// <summary>
    /// ContactService class, provides a service layer to interact with contacts within the datasource.
    /// </summary>
    public class ContactRepository : BaseRepository, IContactRepository
    {
        #region Constructors
        /// <summary>
        /// Creates a new instance of a ContactService, and initializes it with the specified arguments.
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="user"></param>
        /// <param name="service"></param>
        /// <param name="logger"></param>
        public ContactRepository(PimsContext dbContext, ClaimsPrincipal user, IPimsRepository service, ILogger<ContactRepository> logger, IMapper mapper) : base(dbContext, user, service, logger, mapper) { }
        #endregion

        #region Methods
        /// <summary>
        /// Returns the total number of contacts in the database.
        /// </summary>
        /// <returns></returns>
        public int Count()
        {
            return this.Context.PimsContactMgrVws.Count();
        }

        /// <summary>
        /// Get an array of contacts within the specified filters.
        /// Note that the 'contactFilter' will control the 'page' and 'quantity'.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public IEnumerable<PimsContactMgrVw> Get(ContactFilter filter)
        {
            this.User.ThrowIfNotAuthorized(Permissions.ContactView);
            filter.ThrowIfNull(nameof(filter));
            if (!filter.IsValid())
            {
                throw new ArgumentException("Argument must have a valid filter", nameof(filter));
            }

            IEnumerable<PimsContactMgrVw> contacts = GetFilteredContacts(filter);

            return contacts;
        }

        /// <summary>
        /// Get a contact with the given id.
        /// </summary>
        /// <param name="id">The id of the contact to retrieve</param>
        /// <returns></returns>
        public PimsContactMgrVw Get(string id)
        {
            this.User.ThrowIfNotAuthorized(Permissions.ContactView);
            var contact = Context.PimsContactMgrVws.Where(x => x.Id == id).FirstOrDefault();

            return contact;
        }

        /// <summary>
        /// Get a page with an array of contacts within the specified filters.
        /// Note that the 'contactFilter' will control the 'page' and 'quantity'.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public Paged<PimsContactMgrVw> GetPage(ContactFilter filter)
        {
            this.User.ThrowIfNotAuthorized(Permissions.ContactView);
            filter.ThrowIfNull(nameof(filter));
            if (!filter.IsValid())
            {
                throw new ArgumentException("Argument must have a valid filter", nameof(filter));
            }
            IEnumerable<PimsContactMgrVw> results = GetFilteredContacts(filter);

            return new Paged<PimsContactMgrVw>(results, filter.Page, filter.Quantity, results.Count());
        }

        /// <summary>
        /// Find the entity for the specified 'keyValues'.
        /// </summary>
        /// <param name="keyValues"></param>
        /// <returns></returns>
        public PimsContactMgrVw Find(params object[] keyValues)
        {
            return this.Context.Find<PimsContactMgrVw>(keyValues);
        }

        /// <summary>
        /// Generate an SQL statement for the specified 'filter'.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        private IEnumerable<PimsContactMgrVw> GetFilteredContacts(ContactFilter filter)
        {
            filter.ThrowIfNull(nameof(filter));

            var query = Context.PimsContactMgrVws.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(filter.Municipality))
            {
                query = query.Where(c => EF.Functions.Like(c.MunicipalityName, $"%{filter.Municipality}%"));
            }

            var summary = filter.Summary.Trim();

            if (filter.SearchBy == "persons")
            {
                query = query.Where(c => c.PersonId != null && c.Id.StartsWith("P"));
                string[] nameParts = filter.Summary.Split(' ');
                if (!string.IsNullOrWhiteSpace(summary))
                {
                    foreach (string namePart in nameParts)
                    {
                        query = query.Where(c => EF.Functions.Like(c.FirstName, $"%{namePart}%") || EF.Functions.Like(c.Surname, $"%{namePart}%") || EF.Functions.Like(c.MiddleNames, $"%{namePart}%"));
                    }
                }
            }
            else if (filter.SearchBy == "organizations")
            {
                query = query.Where(c => c.OrganizationId != null && c.Id.StartsWith("O"));
                if (!string.IsNullOrWhiteSpace(summary))
                {
                    query = query.Where(c => EF.Functions.Like(c.Summary, $"%{summary}%"));
                }
            }
            else
            {
                string[] nameParts = summary.Split(' ');
                if (!string.IsNullOrWhiteSpace(summary))
                {
                    foreach (string namePart in nameParts)
                    {
                        query = query.Where(c => EF.Functions.Like(c.FirstName, $"%{namePart}%") || EF.Functions.Like(c.Surname, $"%{namePart}%") || EF.Functions.Like(c.MiddleNames, $"%{namePart}%") || EF.Functions.Like(c.OrganizationName, $"%{summary}%"));
                    }
                }
            }

            if (filter.ActiveContactsOnly)
            {
                query = query.Where(c => !c.IsDisabled);
            }

            if (filter.Sort?.Any() == true)
            {
                query = query.OrderByProperty(filter.Sort);
            }
            else
            {
                query = query.OrderBy(c => c.Summary);
            }

            var skip = (filter.Page - 1) * filter.Quantity;
            var contacts = query.Skip(skip)
                .Take(filter.Quantity)
                .ToArray();

            // Unable to use includes on PersonOrganization as scaffolded views in EF are keyless entities.
            var joinOrganizationQuery = from c in this.Context.Set<PimsContactMgrVw>() where contacts.Select(c => c.Id).Contains(c.Id)
                        join o in this.Context.Set<PimsOrganization>()
                            on c.OrganizationId equals o.OrganizationId into contactOrganization
                        from co in contactOrganization.DefaultIfEmpty()
                        join po in this.Context.Set<PimsPersonOrganization>()
                            on co.OrganizationId equals po.OrganizationId into contactPersonOrganization
                        from copo in contactPersonOrganization.DefaultIfEmpty()
                        join p in this.Context.Set<PimsPerson>()
                            on copo.PersonId equals p.PersonId into contactPersonOrganizationPerson
                        from copop in contactPersonOrganizationPerson.DefaultIfEmpty()
                        select new { Contact = c, Organization = co, PersonOrganization = copo, Person = copop };

            var contactsWithOrganizations = joinOrganizationQuery.ToArray();

            // The joinOrganizationQuery returns a cartesion product, this creates a unique list of contacts with attached Organization and list of PersonOrganizations.
            return contactsWithOrganizations.GroupBy(copop => copop.Contact.Id).Select(contactGroup => {
                PimsContactMgrVw contact = contactGroup.FirstOrDefault().Contact;
                PimsOrganization organization = contactGroup.FirstOrDefault().Organization;
                if (organization != null)
                {
                    IEnumerable<PimsPersonOrganization> pimsPersonOrganizations = contactsWithOrganizations
                        .Where(copop => copop.Contact.Id == contactGroup.Key && copop.PersonOrganization != null)
                        .Select(copop =>
                        {
                            copop.PersonOrganization.Person = copop.Person;
                            return copop.PersonOrganization;
                        });

                    organization.PimsPersonOrganizations = pimsPersonOrganizations.ToArray();
                    contact.Organization = organization;
                }
                return contact;
            });
        }
        #endregion
    }
}
