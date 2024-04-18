import * as React from 'react';
import { Col } from 'react-bootstrap';
import { FaCircle, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Section } from '@/components/common/Section/Section';
import { SectionField } from '@/components/common/Section/SectionField';
import { AddressField } from '@/features/contacts/interfaces';
import { IContactOrganization, IContactPerson } from '@/interfaces/IContact';

import * as Styled from '../../styles';
import { toAddressFields } from '../utils/contactUtils';
import ContactInfoSubForm from './ContactInfoSubForm';

export interface PersonFormViewProps {
  person: IContactPerson;
}

const PersonFormView: React.FunctionComponent<React.PropsWithChildren<PersonFormViewProps>> = ({
  person,
}) => {
  let personAddresses: AddressField[];
  if (person.addresses === undefined) {
    personAddresses = [];
  } else {
    personAddresses = toAddressFields(person.addresses);
  }

  return (
    <>
      <Section key={'contact-person-' + person.id + '-names'} className="mb-4">
        <Styled.RowAligned>
          <Col>
            <Styled.H2 data-testid="contact-person-fullname">
              <FaRegUser size={20} className="mr-2" />
              {person.fullName}
            </Styled.H2>
          </Col>
          <Col md="auto" className="ml-auto">
            <Styled.StatusIndicators className={person.isDisabled ? 'inactive' : 'active'}>
              <FaCircle size={14} className="mr-2" />
              <span data-testid="contact-person-status">
                {person.isDisabled ? 'INACTIVE' : 'ACTIVE'}
              </span>
            </Styled.StatusIndicators>
          </Col>
        </Styled.RowAligned>
        <Styled.RowAligned>
          <Col md="3">
            <strong>Preferred name:</strong>
          </Col>
          <Col md="auto">
            <span data-testid="contact-person-preferred">{person.preferredName}</span>
          </Col>
        </Styled.RowAligned>
      </Section>
      <Section
        header="Organization(s)"
        key={'contact-person-' + person.id + '-organization'}
        className="mb-4"
      >
        <Styled.RowAligned>
          <Col md="auto">
            {person.organizations &&
              person.organizations.map((organization: IContactOrganization, index: number) => (
                <SectionField key={'person-org-' + index} label="Organization name">
                  <Link
                    to={'/contact/O' + organization.id}
                    data-testid="contact-person-organization"
                  >
                    {organization.name}
                  </Link>
                  <br />
                </SectionField>
              ))}
          </Col>
        </Styled.RowAligned>
      </Section>
      <Section
        header="Contact Info"
        key={'contact-person-' + person.id + '-contacts'}
        className="mb-4"
      >
        <ContactInfoSubForm contactEntity={person} />
      </Section>

      {personAddresses.map((field: AddressField, index: number) => (
        <Section
          header={field.label}
          key={'contact-person-' + person.id + '-address-' + index}
          className="mb-4"
        >
          <Styled.RowAligned className="pb-3" key={'person-address-' + index}>
            <Col md="3">
              <div className="pb-2">
                <strong>{field.label}</strong>
              </div>
            </Col>
            <Col>
              <span data-testid="contact-person-address">
                {field.streetAddress1 && <div>{field.streetAddress1} </div>}
                {field.streetAddress2 && <div>{field.streetAddress2} </div>}
                {field.streetAddress3 && <div>{field.streetAddress3} </div>}
                <div>{field.municipalityAndProvince} </div>
                {field.postal && <div>{field.postal} </div>}
                {field.country && <div>{field.country}</div>}
                {index + 1 !== personAddresses.length && <hr></hr>}
              </span>
            </Col>
          </Styled.RowAligned>
        </Section>
      ))}
      <Section header="Comments" key={'contact-person-' + person.id + '-comments'}>
        <Styled.RowAligned>
          <Col>
            <span data-testid="contact-person-comment">{person.comment}</span>
          </Col>
        </Styled.RowAligned>
      </Section>
    </>
  );
};

export default PersonFormView;
