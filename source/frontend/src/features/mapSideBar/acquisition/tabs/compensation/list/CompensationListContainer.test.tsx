import { createMemoryHistory } from 'history';

import { SideBarContextProvider } from '@/features/mapSideBar/context/sidebarContext';
import { useCompensationRequisitionRepository } from '@/hooks/repositories/useRequisitionCompensationRepository';
import {
  getMockApiCompensationList,
  getMockApiDefaultCompensation,
  getMockDefaultCreateCompenReq,
} from '@/mocks/compensations.mock';
import { mockLookups } from '@/mocks/lookups.mock';
import { lookupCodesSlice } from '@/store/slices/lookupCodes';
import { act, render, RenderOptions, screen, userEvent, waitFor } from '@/utils/test-utils';

import CompensationListContainer, {
  ICompensationListContainerProps,
} from './CompensationListContainer';
import { ICompensationListViewProps } from './CompensationListView';

const storeState = {
  [lookupCodesSlice.name]: { lookupCodes: mockLookups },
};
const mockPostApi = {
  error: undefined,
  response: undefined,
  execute: jest.fn(),
  loading: false,
};
const mockGetApi = {
  error: undefined,
  response: getMockApiCompensationList(),
  execute: jest.fn(),
  loading: false,
};

jest.mock('@/hooks/repositories/useRequisitionCompensationRepository');

const history = createMemoryHistory();
jest.mock('@react-keycloak/web');

jest.mock('@/hooks/repositories/useAcquisitionProvider', () => ({
  useAcquisitionProvider: () => {
    return {
      getAcquisitionCompensationRequisitions: mockGetApi,
      postAcquisitionCompensationRequisition: mockPostApi,
    };
  },
}));

let viewProps: ICompensationListViewProps;
const CompensationListView = (props: ICompensationListViewProps) => {
  viewProps = props;
  return <></>;
};

describe('compensation list view container', () => {
  const setup = async (
    renderOptions?: RenderOptions & Partial<ICompensationListContainerProps>,
  ) => {
    // render component under test
    const component = render(
      <SideBarContextProvider>
        <CompensationListContainer
          View={CompensationListView}
          fileId={renderOptions?.fileId ?? 1}
        />
      </SideBarContextProvider>,
      {
        ...renderOptions,
        store: storeState,
        history: history,
        claims: renderOptions?.claims ?? [],
      },
    );

    return {
      ...component,
    };
  };

  beforeEach(() => {
    (useCompensationRequisitionRepository as jest.Mock).mockImplementation(() => ({
      deleteCompensation: mockPostApi,
    }));
  });

  it('renders as expected', async () => {
    const { asFragment } = await setup({
      claims: [],
    });
    const fragment = await waitFor(() => asFragment());
    expect(fragment).toMatchSnapshot();
  });

  it('Delete compensation calls displays delete modal', async () => {
    setup({
      claims: [],
    });
    viewProps.onDelete(1);
    const modal = await screen.findByText('Confirm Delete');

    expect(modal).toBeVisible();
  });

  it('confirming delete modal sends delete call', async () => {
    setup({
      claims: [],
    });
    viewProps.onDelete(1);
    const continueButton = await screen.findByText('Continue');
    act(() => userEvent.click(continueButton));

    expect(mockPostApi.execute).toHaveBeenCalledWith(1);
  });

  it('fetchs data when no data is currently available in container', async () => {
    setup({
      claims: [],
    });

    expect(mockGetApi.execute).toHaveBeenCalledTimes(0);
  });

  it('Creates the Compensation Requisition with the default data', async () => {
    mockPostApi.execute.mockResolvedValue(getMockApiDefaultCompensation());

    await setup({});
    await act(async () => {
      viewProps?.onAdd();
    });

    expect(mockPostApi.execute).toHaveBeenCalledWith(1, getMockDefaultCreateCompenReq());
  });
});