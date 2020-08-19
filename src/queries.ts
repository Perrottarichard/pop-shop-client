import { gql } from '@apollo/client'

// const BOOK_DETAILS = gql`
// fragment bookDetails on Book {
//     title
//     published
//     author {
//         name
//         born
//     }
//     genres
// }`
export const ME = gql`
query {
    me {
        firstName
        lastName
        email
        favoriteFlavor
        paymentInfo {
            firstName
            lastName
            shippingAddress
            city
            state
            zip
            country
            creditCardNumber
            creditCardCVV
            creditCardNameOnCard
            creditCardExpire
            creditCardType
        }
        id
        cart {
            item {
                id
                type
                isDeal
                brand {
                    name
                }
            }
            quantity
            flavor
            color
            size
            price
            id
        }
     }
}`

export const LOGIN = gql`
mutation loginAttempt($email: String!, $password: String!) {
    login(
        email: $email,
        password: $password
    ) {
        value
    }
        
    }`

export const CREATE_USER = gql`
mutation createAttempt ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $favoriteFlavor: String!) {
    createUser(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password,
        favoriteFlavor: $favoriteFlavor
    ) {
        firstName
        lastName
        email
        favoriteFlavor
    }
}`

export const ADD_TO_CART = gql`
mutation addToCartAttempt ($item: ProductInput!, $quantity: Int!, $flavor: String, $size: String!, $price: Float!, $color: String) {
    addCart(
    item: $item,
    quantity: $quantity,
    flavor: $flavor,
    color: $color,
    size: $size,
    price: $price
    ) {
        item {
            id
            type
            isDeal
            brand {
                name
            }
        }
        quantity
        flavor
        color
        size
        price
        id
    }
}
`

export const ALL_PRODUCTS = gql`
query{
  allProducts {
    type
    isDeal
    brand {
        name
        countryOfOrigin
        contactNumber
        contactEmail
    }
    flavors
    colors
    sizes
    prices
    inStock
    internationalShipping
    id
  }
}
`
export const GET_CART = gql`
query {
    getCart {
        item {
            id
            type
            isDeal
            brand {
                name
            }
        }
        quantity
        size
        flavor
        color
        price
        id
    }
}
`
export const GET_ORDERS = gql`
query {
    getOrders {
        id
        totalPrice
        confirmation
        cart {
            item {
                type
                isDeal
                brand {
                    name
                }
            }
            quantity
            color
            flavor
            size
            price
            id
        }
    }
}
`
export const REMOVE_CART = gql`
mutation removeCartAttempt($id: ID!) {
    removeCart(
        id: $id
    ) {
        id
    }
}`

export const CREATE_ORDER = gql`
mutation createOrderAttempt($formFirstName: String!, $formLastName: String!, $shippingAddress: String!, $city: String!, $state: String!, $zip: String!, $country: String!, $creditCardNumber: String!, $creditCardCVV: String!, $creditCardExpire: String!, $creditCardNameOnCard: String!, $totalPrice: Float, $confirmation: String){
    createOrder(
        firstName: $formFirstName
        lastName: $formLastName
        shippingAddress: $shippingAddress
        city: $city
        state: $state
        zip: $zip
        country: $country
        creditCardNumber: $creditCardNumber
        creditCardCVV: $creditCardCVV
        creditCardExpire: $creditCardExpire
        creditCardNameOnCard: $creditCardNameOnCard
        totalPrice: $totalPrice
        confirmation: $confirmation
    ) {
        id
        confirmation
    }
}`
// export const BOOK_ADDED = gql`
// subscription {
//     bookAdded {
//         ...bookDetails
//     }
// }
// ${BOOK_DETAILS}`

// export const ALL_BOOKS = gql`
// query {
//     allBooks {
//         ...bookDetails
//     }
// }
// ${BOOK_DETAILS}
// `
// export const BOOK_BY_GENRE = gql`
// query chosenFilterByGenre($genre: String!) {
//     filterByGenre(
//         genre: $genre
//     ) {
//         title
//         author {
//             name
//             born
//         }
//         published
//     }
// }`
// export const ADD_BOOK = gql`
// mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
//     addBook(
//         title: $title,
//         author: $author,
//         published: $published,
//         genres: $genres
//     ) {
//         title
//         published
//     }
// }
// `
// export const ADD_AUTHOR = gql`
// mutation authorToAdd($name: String!) {
//     addAuthor(name: $name) {
//         name
//         id
//     }
// }`
// export const HAS_AUTHOR = gql`
// query authorExists($name: String!) {
//     hasAuthor(name: $name)
// }
// `
// export const SET_BIRTH = gql`
// mutation changeBirth($name: String!, $setBornTo: Int!) {
//     editAuthor(
//         name: $name,
//         setBornTo: $setBornTo
//     ) {
//         name
//         born
//     }
// }
// `