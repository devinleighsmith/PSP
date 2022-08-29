import { StyledDivider } from 'components/common/styles';
import { UserNameTooltip } from 'components/common/UserNameTooltip';
import { HeaderField } from 'features/mapSideBar/tabs/HeaderField';
import { Api_File } from 'models/api/File';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { prettyFormatDate } from 'utils';

export interface IActivityHeaderProps {
  file: Api_File;
}

export const ActivityHeader: React.FunctionComponent<IActivityHeaderProps> = ({ file }) => {
  const leftColumnWidth = '5';
  const leftColumnLabel = '3';
  return (
    <Row className="no-gutters pl-4 pr-4">
      <Col>
        <Row className="no-gutters">
          <Col xs={leftColumnWidth}>
            <HeaderField label="File: " labelWidth={leftColumnLabel}>
              {file?.fileNumber}
            </HeaderField>
          </Col>
          <Col className="text-right">
            Created: <strong>{prettyFormatDate(file?.appCreateTimestamp)}</strong> by{' '}
            <UserNameTooltip userName={file?.appCreateUserid} userGuid={file?.appCreateUserGuid} />
          </Col>
        </Row>
        <Row className="no-gutters">
          <Col xs={leftColumnWidth}></Col>
          <Col className="text-right">
            Last updated: <strong>{prettyFormatDate(file?.appLastUpdateTimestamp)}</strong> by{' '}
            <UserNameTooltip
              userName={file?.appLastUpdateUserid}
              userGuid={file?.appLastUpdateUserGuid}
            />
          </Col>
        </Row>
        <Row className="no-gutters">
          <Col xs={leftColumnWidth}></Col>
          <Col>
            <HeaderField className="justify-content-end" label="Status:">
              {file?.fileStatusTypeCode?.description}
            </HeaderField>
          </Col>
        </Row>
        <StyledDivider />
      </Col>
    </Row>
  );
};

export default ActivityHeader;
