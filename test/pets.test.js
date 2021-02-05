const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pets', () => {
    it('should fail to create a pets without a name', async () => {
      const res = await request(app).post('/pets/save').send({
        name: 'Dog',
        age: '5',
        colour: 'brown',
      });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('"name" is required');
    });
  
    it('should create a pets', async () => {
      const pets = {
        name: 'Dog',
        age: '5',
        colour: 'brown'
      };
      const res = await request(app).post('/pets/save').send(pets);
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal(user.name);
      expect(res.body.age).to.equal(user.age);
      expect(res.body.colour).to.equal(user.colour);
    });

    it('should get a pets', async () => {
        const res = await request(app).get('/pets/get');
        expect(res.status).to.equal(200);
    });

    it('should delete a pet', async () => {
        const id = '_123456';
        const res = await request(app).get('/pets/delete/' + id);
        expect(res.status).to.equal(200);
    });
  });