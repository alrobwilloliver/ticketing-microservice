import request from 'supertest'
import { app } from '../../app'

it('responds with details about the current user', async () => {
    const response = await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    
    const cookie = response.get('Set-Cookie')

    const currentUser = await request(app)
        .get('/current-user')
        .set('Cookie', cookie)
        .expect(200)

    expect(currentUser.body.currentUser.email).toEqual('test@test.com')
})
