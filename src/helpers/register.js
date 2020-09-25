import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";

Enzyme.configure({ adapter: new Adapter() });
global.expect = expect;
