const Depart = require("../department.model");
const mongoose = require("mongoose");
const expect = require("chai").expect;

describe("Department", () => {
  it('should throw an error if no "name" arg', () => {
    const department = new Depart({});

    department.validate((err) => {
      expect(err.errors.name).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Depart({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw an error if "name" is too short or too long', () => {
    const cases = ["Abc", "abcd", "Lorem Ipsum, Lorem Ip"];
    for (let name of cases) {
      const dep = new Depart({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should not throw an error if "name" is okay', () => {
    const cases = ["Management", "Human Resources"];
    for (let name of cases) {
      const dep = new Depart({ name });

      dep.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
