var chai = require('chai'),
    expect = chai.expect,
    Promise = require('bluebird'),
    request = require('superagent-promise')(require('superagent'), Promise),
    chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var url = process.env.URL || 'http://localhost:8000/todos/';


describe('Cross Origin Requests', function() {

  it('should return the correct CORS headers and allow all the origins', function() {
     request('OPTIONS', url)
        .set('Origin', 'http://someplace.com')
        .then(res => {
            expect(res.header).to.include.all.keys(
              'access-control-allow-origin',
              'access-control-allow-methods',
              'access-control-allow-headers',
              );
            expect(res.header).to.have.property('access-control-allow-origin', '*');
            });
  });
});

describe('Create Todo Item', function() {
  var response;
  before(function(done){
    request
      .post(url)
      .send({ title: 'Walk the dog' })
      .then(res => {
        response = res;
        done();
      });
  })

  it('should return a 201 CREATED response', function() {
    return expect(response).to.have.property('status', 201);
  });

//  it('should receive a location hyperlink', function() {
//    return expect(response.header.location).to.match(/^https?:\/\/.+\/todos\/[\d]+$/);
//  });

  it('should create the item', function() {
    return expect(response.body).to.have.property('title','Walk the dog');
  });

});

describe('Update Todo Item', function() {
  var location;

  beforeEach(function(done){
    request
      .post(url)
      .send({ title: 'Walk the dog' })
      .then(res => {
        location = res.header.location
        done();
      });
  })

  it('should have completed set to true after PUT update', function() {
    request
      .put(location)
      .send({ 'completed': true })
      .then(res => {
        return expect(res.body).to.have.property('completed', true);
      });
  });

  it('should have completed set to true after PATCH update', function() {
    request
      .patch(location)
      .send({ 'completed': true })
      .then(res => {
        return expect(res.body).to.have.property('completed', true);
      });
  });
});

describe('Delete Todo Item', function() {
  var location;

   beforeEach(function(done){
    request
      .post(url)
      .send({ title: 'Walk the dog' })
      .then(res => {
        location = res.header.location
        done();
      });
  })

  it('should return a 204 NO CONTENT response', function() {
    request
      .del(location)
      .end(res => {
        return expect(res).to.have.property('status', 204);
      });
  });
});
