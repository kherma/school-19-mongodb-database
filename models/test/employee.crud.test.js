const Employee = require("../employee.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

const sampleData = {
  user1: {
    firstName: "firstName1",
    lastName: "lastName1",
    departmentId: "6067a6622b560802d50494c1",
  },
  user2: {
    firstName: "firstName2",
    lastName: "lastName2",
    departmentId: "6067a6622b560802d50494c1",
  },
};

describe("Employee", () => {
  // ===========
  // Before
  // ===========

  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getConnectionString();

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  });

  // ===========
  // Tests
  // ===========

  describe("Reading data", () => {
    before(async () => {
      const testEmpOne = new Employee(sampleData.user1);
      await testEmpOne.save();

      const testEmpTwo = new Employee(sampleData.user2);
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const employee = await Employee.findOne({
        firstName: sampleData.user1.firstName,
      });
      expect(employee.firstName).to.be.equal(sampleData.user1.firstName);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Creating data", () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee(sampleData.user1);
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee(sampleData.user1);
      await testEmpOne.save();

      const testEmpTwo = new Employee(sampleData.user2);
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: sampleData.user1.firstName },
        { $set: { firstName: `=${sampleData.user1.firstName}=` } }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: `=${sampleData.user1.firstName}=`,
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({
        firstName: sampleData.user1.firstName,
      });
      employee.firstName = `=${sampleData.user1.firstName}=`;
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: `=${sampleData.user1.firstName}=`,
      });

      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: "Updated!" } });
      const employees = await Employee.find();
      expect(employees[0].firstName).to.be.equal("Updated!");
      expect(employees[1].firstName).to.be.equal("Updated!");
    });
    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Removing data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee(sampleData.user1);
      await testEmpOne.save();

      const testEmpTwo = new Employee(sampleData.user2);
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: sampleData.user1.firstName });
      const removeEmployee = await Employee.findOne({
        firstName: sampleData.user1.firstName,
      });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({
        firstName: sampleData.user1.firstName,
      });
      await employee.remove();
      const removedEmployee = await Employee.findOne({
        firstName: sampleData.user1.firstName,
      });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  // ===========
  // After
  // ===========

  after(() => {
    mongoose.models = {};
  });
});
