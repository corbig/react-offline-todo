import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Comment these 2 lines to run tests with Jest

/*const testsContext = require.context('.', true, /.test$/);

testsContext.keys().forEach(testsContext);*/