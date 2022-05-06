import { screen } from '@testing-library/react';
import { apiLeaseToFormLease } from 'features/leases/leaseUtils';
import { createMemoryHistory } from 'history';
import { defaultFormLease, IFormLease, ILease } from 'interfaces';
import { noop } from 'lodash';
import { mockApiPerson, mockOrganization } from 'mocks/filterDataMock';
import React from 'react';
import { render, RenderOptions, userEvent } from 'utils/test-utils';

import PrimaryContactWarningModal from './PrimaryContactWarningModal';

const history = createMemoryHistory();

describe('PrimaryContactWarningModal component', () => {
  const setup = (
    renderOptions: RenderOptions & { lease?: IFormLease; saveCallback?: Function } = {},
  ) => {
    // render component under test
    const component = render(
      <PrimaryContactWarningModal
        lease={renderOptions.lease}
        saveCallback={renderOptions.saveCallback}
      />,
      {
        ...renderOptions,
        history,
      },
    );

    return {
      component,
    };
  };
  it('renders as expected', () => {
    const { component } = setup({
      lease: { ...defaultFormLease, persons: [mockApiPerson], organizations: [mockOrganization] },
    });
    expect(component.asFragment()).toMatchSnapshot();
  });
  it('calls saveCallback on save', () => {
    const saveCallback = jest.fn();
    const { component } = setup({
      saveCallback: saveCallback,
      lease: { ...defaultFormLease, persons: [mockApiPerson, mockApiPerson] },
    });
    const { getByText } = component;
    const save = getByText('Save');
    userEvent.click(save);

    expect(saveCallback).toHaveBeenCalled();
  });

  it('displays all organization tenants that have multiple persons and no primary contact', () => {
    setup({
      lease: apiLeaseToFormLease(mockLeaseWithNoTenants),
      saveCallback: noop,
    });
    const tenantText = screen.getByText(content =>
      content.includes('French Mouse Property Management'),
    );

    expect(tenantText).toBeVisible();
  });
});

export const mockLeaseWithNoTenants: ILease = {
  id: 1,
  rowVersion: 2,
  terms: [],
  tenantNotes: ['a note', '', ''],
  persons: [],
  organizations: [],
  tenants: [
    {
      leaseTenantId: 82,
      leaseId: 1,
      organizationId: 2,
      organization: {
        id: 2,
        isDisabled: false,
        name: 'French Mouse Property Management',
        alias: '',
        incorporationNumber: '',
        organizationPersons: [
          {
            person: {
              id: 1,
              isDisabled: false,
              surname: 'Smith',
              firstName: 'Bob',
              middleNames: 'Billy',
              preferredName: 'Tester McTest',
              personOrganizations: [
                {
                  personId: 1,
                  isDisabled: false,
                  rowVersion: 3,
                },
              ],
              personAddresses: [],
              contactMethods: [],
              comment: 'This is a test comment.',
              rowVersion: 4,
            },
            personId: 1,
            organizationId: 2,
            isDisabled: false,
            rowVersion: 3,
          },
          {
            person: {
              id: 4,
              isDisabled: false,
              surname: 'Mouse',
              firstName: 'Minnie',
              middleNames: 'Nacho Cheese',
              personOrganizations: [
                {
                  personId: 4,
                  isDisabled: false,
                  rowVersion: 1,
                },
              ],
              personAddresses: [],
              contactMethods: [],
              rowVersion: 1,
            },
            personId: 4,
            organizationId: 2,
            isDisabled: false,
            rowVersion: 1,
          },
        ],
        organizationAddresses: [],
        contactMethods: [],
        comment: '',
        rowVersion: 2,
      },
      note: 'a note',
      lessorType: {
        id: 'ORG',
        description: 'Organization',
        isDisabled: false,
      },
      appCreateTimestamp: '2022-05-05T00:56:06.693',
      appLastUpdateTimestamp: '2022-05-05T00:56:06.693',
      appLastUpdateUserid: 'admin',
      appCreateUserid: 'admin',
      rowVersion: 1,
    },
    {
      leaseTenantId: 83,
      leaseId: 1,
      organizationId: 3,
      organization: {
        id: 3,
        isDisabled: false,
        name: 'Dairy Queen Forever! Property Management',
        organizationPersons: [
          {
            person: {
              id: 3,
              isDisabled: false,
              surname: 'Cheese',
              firstName: 'Stinky',
              middleNames: '',
              personOrganizations: [
                {
                  personId: 3,
                  isDisabled: false,
                  rowVersion: 1,
                },
              ],
              personAddresses: [],
              contactMethods: [],
              rowVersion: 1,
            },
            personId: 3,
            organizationId: 3,
            isDisabled: false,
            rowVersion: 1,
          },
        ],
        organizationAddresses: [],
        contactMethods: [],
        rowVersion: 1,
      },
      note: '',
      lessorType: {
        id: 'ORG',
        description: 'Organization',
        isDisabled: false,
      },
      appCreateTimestamp: '2022-05-05T00:56:06.693',
      appLastUpdateTimestamp: '2022-05-05T00:56:06.693',
      appLastUpdateUserid: 'admin',
      appCreateUserid: 'admin',
      rowVersion: 1,
    },
    {
      leaseTenantId: 84,
      leaseId: 1,
      organizationId: 4,
      organization: {
        id: 4,
        isDisabled: false,
        name: 'Pussycat Property Management',
        organizationPersons: [],
        organizationAddresses: [],
        contactMethods: [],
        rowVersion: 1,
      },
      note: '',
      lessorType: {
        id: 'ORG',
        description: 'Organization',
        isDisabled: false,
      },
      appCreateTimestamp: '2022-05-05T00:56:06.693',
      appLastUpdateTimestamp: '2022-05-05T00:56:06.693',
      appLastUpdateUserid: 'admin',
      appCreateUserid: 'admin',
      rowVersion: 1,
    },
  ],
  properties: [],
  insurances: [],
  improvements: [],
  securityDeposits: [],
} as any;
