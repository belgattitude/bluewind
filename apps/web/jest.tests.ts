import { configure } from 'enzyme';

// tslint:disable-next-line:no-var-requires
const Adapter = require('enzyme-adapter-react-16');

import 'jest-enzyme';

configure({ adapter: new Adapter() });
