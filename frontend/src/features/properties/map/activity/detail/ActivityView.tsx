import { DocumentRelationshipType } from 'constants/documentRelationshipType';
import { NoteTypes } from 'constants/noteTypes';
import DocumentListContainer from 'features/documents/list/DocumentListContainer';
import { Section } from 'features/mapSideBar/tabs/Section';
import { NoteListView } from 'features/notes/list/NoteListView';
import noop from 'lodash/noop';
import { Api_Activity } from 'models/api/Activity';
import * as React from 'react';

import { ActivityFile } from './ActivityContainer';
import { ActivityControlsBar } from './ActivityControlsBar';
import { ActivityDescription } from './ActivityDescription';
import ActivityHeader from './ActivityHeader';

export interface IActivityViewProps {
  activity: Api_Activity;
  file: ActivityFile;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

export const ActivityView: React.FunctionComponent<IActivityViewProps> = ({
  file,
  editMode,
  setEditMode,
}) => {
  return (
    <>
      <ActivityHeader file={file} />
      <ActivityControlsBar
        editMode={editMode}
        setEditMode={setEditMode}
        onEditRelatedProperties={noop}
      />
      <Section header="Description" isCollapsable initiallyExpanded title="description">
        <ActivityDescription editMode={editMode} />
      </Section>
      <DocumentListContainer
        relationshipType={DocumentRelationshipType.ACTIVITIES}
        parentId={file.id}
      />
      <NoteListView type={NoteTypes.Activity} entityId={file.id} />
    </>
  );
};

export default ActivityView;
