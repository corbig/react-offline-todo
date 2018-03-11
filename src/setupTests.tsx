import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const testsContext = require.context('.', true, /.test$/);

testsContext.keys().forEach(testsContext);