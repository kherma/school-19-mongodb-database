const Employee = require("../employee.model");
const mongoose = require("mongoose");
const expect = require("chai").expect;

describe("Employee", () => {
  it("should throw an error if no arg", () => {
    const employee = new Employee({});

    employee.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.departmentId).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });
  it("should throw an error if args types are wrong", () => {
    const cases = [{}, []];
    for (let type of cases) {
      const employee = new Employee({
        firstName: type,
        lastName: type,
        departmentId: type,
      });

      employee.validate((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.departmentId).to.exist;
      });
    }
  });
  it("should not throw an error if args are okay", () => {
    const cases = [
      {
        firstName: "John",
        lastName: "Doe",
        departmentId: 1,
      },
      {
        firstName: "Mike",
        lastName: "Novak",
        departmentId: 2,
      },
    ];
    for (let worker of cases) {
      const employee = new Employee(worker);

      employee.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
