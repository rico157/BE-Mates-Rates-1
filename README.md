# BE-Mates-Rates - [HOST](https://matesrates.herokuapp.com/graphql)
The backend of our [Mates Rates](https://github.com/rico157/MatesRates/) app that list reviews of restaurants your friends have been to. In here will be the database and the server

# Example Queries

### Restaurant Type 

```graphql
{
  restaurant(id: "5fad52e16b765b6024a6da3a") {
    id
    name
    address
    cuisine
    website
    logo
    information
    phone
    description
    
    # city type
    city {
      id
      name
    }
    
    # review type
    reviews {
      id
      rating
      body
    }
  }
}

```

### User Type 

```graphql
{
  user(id: "5fad52e16b765b6024a6da5d") {
    id
    name
    username
    avatarURL
    
    # user type
    friends {
      id
      name
      avatarURL
      ...
    }
    
    #restaurant type
    wishlist {
      id
      name
      cuisine
      logo
      ...
    }
    
    #review type
    reviews {
      id
      rating
      body
      ...
    }
  }
}
```

### Review type

```graphql
    {
  reviews {
    id
    body
    rating
    
    # user type
    user_id {
      id
      name
      avatarURL
      ...
    }
    
    # restaurant type
    restaurant_id {
      id
      name
      cuisine
      ...
    }
  }
}

```

### Get list of users with wishlist and reviews:

```graphql
{
  # user type
  users {
    id
    name
    username
    avatarURL
    
    # user type
    friends {
      id
      name
      avatarURL
      ...
    }
    
    #restaurant type
    wishlist {
      id
      name
      cuisine
      logo
      ...
    }
    
    #review type
    reviews {
      id
      rating
      body
      ...
    }
  }
}

```

### Get list of restaurants with all info and reviews:

```graphql
{
  # restaurant type
  restaurants {
    id
    name
    address
    cuisine
    website
    logo
    information
    phone
    description
    city {
      id
      name
    }
    
    # review type
    reviews {
      id
      rating
      body
      ...
    }
  }
}
```

### Get list of reviews with users and restaurants:

```graphql
{
  # review type
  reviews {
    id
    body
    rating
    
    # user type
    user_id {
      id
      name
      avatarURL
      ...
    }
    
    # restaurant type
    restaurant_id {
      id
      name
      cuisine
      logo
      ...
    }
  }
}

```

