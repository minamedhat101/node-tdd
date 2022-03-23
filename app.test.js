const request = require('supertest')
const app = require('./app')

const todo = {
  id: 1,
  name: 'a name',
}

describe('Todos', () => {
  it('Get /todos --> array of todos', () => {
    return request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(
              {
                id: expect.any(Number),
                name: expect.any(String),
                completed: expect.any(Boolean),
              }
            ),
          ])
        )
      })
  })

  it('Get /todos --> validate request body', () => {
    return request(app).post('/todos').send(todo).expect(422)
  })

  it('Get /todos/id --> 404 if not found', () => {
    return request(app).get('/todos/999').expect(404)
  })

  it('Get /todos/id --> todo with the id', () => {
    return request(app)
      .get('/todos/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        )
      })
  })

  it('Post /todos --> create todo', () => {
    return request(app)
      .post('/todos')
      .send({})
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name: todo.name,
            compledted: false,
          })
        )
      })
  })

  it('Update /todos/id --> updating a todo with id', () => {})
  it('Delete /todos/id --> delete a todo with id', () => {})
})
