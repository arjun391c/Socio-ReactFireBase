let db = {
    users: {
        userId: 'dsdgsdgafet23r',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2020-07-15T07:51:57.683Z',
        imageUrl: 'image/fgdfgsdgdfg/dsfgdfg',
        bio: 'Hello im user.',
        website: 'https://user.com',
        location: 'London, Uk'
    },
    screams: [
        {
            userHandle: 'user',
            body: 'This is a demo scream',
            createdAt: '2020-07-15T07:51:57.683Z',
            likeCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
            userHandle: 'user',
            screamId: 'sdf4f54h56hgw4efrv',
            body: 'nice one',
            createdAt: '2020-07-15T07:51:57.683Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'demo',
            read: 'true | dalse',
            screamId: '43tf3wg5gedgfvsaf',
            type: 'like | comment',            
            createdAt: '2020-07-15T07:51:57.683Z'
        }
    ],
}

const userDetails = {
    //redux
    credentials: {
        userId: 'werf32rf4gv45hb45hb',
        email: 'user@gmail.com',
        handle: 'user',
        createdAt: '2020-07-15T07:51:57.683Z',
        imageUrl: 'image/sgsdfsdf/dsgfsgdfg',
        bio: 'Hey im user.',
        website: 'https://user.com',
        location: 'London, UK'
    },
    likes: [
        {
            userHandle: 'user',
            screamId: 'sdfasdfg34t545gh64jhn'
        },
        {
            userHandle: 'user',
            screamId: 'sfdsafsdfadsfwf3456t6'
        }
    ]
}