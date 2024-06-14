import React from 'react';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import styled from 'styled-components';

import { Button, ButtonProps } from '.';

interface IExpandCollapseButtonProps extends ButtonProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

/**
 * PlusButton displaying a plus button, used to add new items.
 * @param param0
 */
export const ExpandCollapseButton: React.FC<
  React.PropsWithChildren<IExpandCollapseButtonProps>
> = ({ expanded, toggleExpanded, className }) => {
  return (
    <StyledExpandButton
      variant="light"
      icon={expanded ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
      onClick={() => toggleExpanded()}
      className={className}
    ></StyledExpandButton>
  );
};

const StyledExpandButton = styled(Button)`
  &.btn.btn-light {
    border: 0.1rem solid ${props => props.theme.bcTokens.typographyColorDisabled};
    background-color: white;
    color: ${props => props.theme.bcTokens.typographyColorSecondary};
    &:focus,
    &:active {
      background-color: white;
      color: ${props => props.theme.bcTokens.typographyColorSecondary};
    }
  }
`;
