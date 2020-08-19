import React, { createContext, useState } from 'react'
import { Product } from '../types'
import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS } from '../queries'

interface ProductContextProps {
  products: Product[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortType: string;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  abcSort: (products: Product[]) => Product[];
  cbaSort: (products: Product[]) => Product[];
  cheapSort: (products: Product[]) => Product[];
  expensiveSort: (products: Product[]) => Product[];

}
export const ProductContext = createContext({} as ProductContextProps)

const ProductContextProvider = (props: { children: React.ReactNode }) => {

  let products: [] = []
  const allProducts = useQuery(ALL_PRODUCTS)
  const [search, setSearch] = useState('')
  const [sortType, setSortType] = useState('')

  const abcSort = (products: Product[]): Product[] => {
    return products.sort((a: Product, b: Product) => {
      if (a.brand.name > b.brand.name) {
        return 1
      }
      if (a.brand.name < b.brand.name) {
        return -1
      }
      return 0
    })
  }
  const cbaSort = (products: Product[]): Product[] => {
    return products.sort((a: Product, b: Product) => {
      if (a.brand.name < b.brand.name) {
        return 1
      }
      if (a.brand.name > b.brand.name) {
        return -1
      }
      return 0
    })
  }
  const cheapSort = (products: Product[]): Product[] => {
    return products.sort((a: Product, b: Product) => +a.prices[0] - +b.prices[0])
  }
  const expensiveSort = (products: Product[]): Product[] => {
    return products.sort((a: Product, b: Product) => +b.prices[0] - +a.prices[0])
  }

  if (allProducts.loading || !allProducts.data) {
    products = []
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products = allProducts.data.allProducts
  }
  return (
    <ProductContext.Provider value={{
      products,
      search,
      setSearch,
      sortType,
      setSortType,
      abcSort,
      cbaSort,
      cheapSort,
      expensiveSort
    }}>
      {props.children}
    </ProductContext.Provider>
  )

}
export default ProductContextProvider