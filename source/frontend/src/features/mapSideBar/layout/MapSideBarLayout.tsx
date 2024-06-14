import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaWindowClose } from 'react-icons/fa';
import VisibilitySensor from 'react-visibility-sensor';
import styled from 'styled-components';

import { ExpandCollapseButton } from '@/components/common/buttons/ExpandCollapseButton';
import { useMapStateMachine } from '@/components/common/mapFSM/MapStateMachineContext';
import * as Styled from '@/components/common/styles';
import TooltipWrapper from '@/components/common/TooltipWrapper';

interface IMapSideBarLayoutProps {
  title: React.ReactNode;
  header?: React.ReactNode;
  icon: React.ReactNode;
  footer?: React.ReactNode | React.FunctionComponent<React.PropsWithChildren<unknown>>;
  showCloseButton?: boolean;
  onClose?: () => void;
}

/**
 * SideBar layout with control bar and then form content passed as child props.
 * @param param0
 */
const MapSideBarLayout: React.FunctionComponent<
  React.PropsWithChildren<IMapSideBarLayoutProps>
> = ({ title, header, icon, showCloseButton, ...props }) => {
  const { mapSideBarViewState, toggleSidebarDisplay } = useMapStateMachine();
  return (
    <VisibilitySensor partialVisibility={true}>
      {({ isVisible }: any) => {
        if (mapSideBarViewState.isCollapsed) {
          return (
            <>
              <Row>
                <Col xs={12} className="justify-content-center d-flex">
                  {icon}
                </Col>
              </Row>
              <Underline className="mb-4" />
              <Row>
                <StyledButtonBar xs={12} className="align-items-center d-flex flex-column-reverse">
                  <ExpandCollapseButton
                    expanded={mapSideBarViewState.isCollapsed}
                    toggleExpanded={toggleSidebarDisplay}
                  />
                  {showCloseButton && (
                    <TooltipWrapper tooltipId="close-sidebar-tooltip" tooltip="Close Form">
                      <CloseIcon title="close" onClick={props.onClose} />
                    </TooltipWrapper>
                  )}
                </StyledButtonBar>
              </Row>

              {props.footer && isVisible && <Footer>{props.footer as React.ReactNode}</Footer>}
            </>
          );
        }
        return (
          <StyledSidebarWrapper>
            <Row>
              <Col>
                <Styled.H1 className="mr-auto">
                  <>
                    {icon}
                    {title}
                  </>
                </Styled.H1>
              </Col>

              <StyledButtonBar xs="auto" className="d-flex">
                <ExpandCollapseButton
                  expanded={mapSideBarViewState.isCollapsed}
                  toggleExpanded={toggleSidebarDisplay}
                />
                <Styled.VerticalLine />
                {showCloseButton && (
                  <TooltipWrapper tooltipId="close-sidebar-tooltip" tooltip="Close Form">
                    <CloseIcon title="close" onClick={props.onClose} />
                  </TooltipWrapper>
                )}
              </StyledButtonBar>
            </Row>
            <Underline />

            {header && isVisible && <Header>{header}</Header>}

            <StyledBody>
              <Content>{isVisible ? props.children : null}</Content>
            </StyledBody>

            {props.footer && isVisible && <Footer>{props.footer as React.ReactNode}</Footer>}
          </StyledSidebarWrapper>
        );
      }}
    </VisibilitySensor>
  );
};

const StyledSidebarWrapper = styled.div`
  min-width: 90rem;
`;

const StyledButtonBar = styled(Col)`
  .btn,
  svg {
    max-width: 2.6rem;
    min-width: 2.6rem;
    max-height: 2.6rem;
    min-height: 2.6rem;
  }
  gap: 1.5rem;
  align-items: center;
`;

const StyledBody = styled.div`
  width: 100%;
  position: relative;
  overflow: auto;
  flex: 1;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  position: relative;
`;

const Footer = styled.div``;

const Underline = styled.div`
  width: 100%;
  border-bottom: solid 0.5rem ${props => props.theme.bcTokens.themeBlue80};
`;

const CloseIcon = styled(FaWindowClose)`
  color: ${props => props.theme.css.textColor};
  font-size: 2.4rem;
  cursor: pointer;
`;

export default MapSideBarLayout;
