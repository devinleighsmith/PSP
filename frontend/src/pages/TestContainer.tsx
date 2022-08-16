import * as React from 'react';
import { toast } from 'react-toastify';

interface ITestPageProps {}
const TestPage: React.FunctionComponent<ITestPageProps> = () => {
  return <TestContainer view={TestView}></TestContainer>;
};

interface ITestContainerProps {
  view: React.FunctionComponent<ITestViewProps>;
}
export const TestContainer: React.FunctionComponent<ITestContainerProps> = ({
  view: View,
  children,
}) => {
  React.useEffect(() => {
    toast.success('test');
  }, []);
  return (
    <>
      <View id={1}></View>
    </>
  );
};

export interface ITestViewProps {
  id: number;
}
const TestView: React.FunctionComponent<ITestViewProps> = props => {
  return <>{props.id}</>;
};

export default TestContainer;
