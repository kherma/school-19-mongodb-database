// ===========
// IMPORTS
// ===========
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Department = require("../../../models/department.model");

// ===========
// MIDDLEWARE
// ===========

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

// ===========
// TESTS
// ===========

describe("GET /api/departments", () => {
  before(async () => {
    const testDepOne = new Department({
      _id: "5d9f1140f10a81216cfd4408",
      name: "Department #1",
    });
    await testDepOne.save();
  });

  it("/:id should delete chosen document and return success", async () => {
    const res = await request(server).delete(
      "/api/departments/5d9f1140f10a81216cfd4408"
    );
    const findDepartment = await Department.findOne({
      _id: "5d9f1140f10a81216cfd4408",
    });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.not.be.null;
    expect(findDepartment).to.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });
});
