
import React, { createContext, useState } from 'react'

interface CheckoutContextProps {
  shippingAddress: string | null;
  setShippingAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string | null;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string | null;
  setState: React.Dispatch<React.SetStateAction<string>>;
  zip: string | null;
  setZip: React.Dispatch<React.SetStateAction<string>>;
  country: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  formFirstName: string | null;
  setFormFirstName: React.Dispatch<React.SetStateAction<string>>;
  formLastName: string | null;
  setFormLastName: React.Dispatch<React.SetStateAction<string>>;
  creditCardNameOnCard: string | null;
  setCreditCardNameOnCard: React.Dispatch<React.SetStateAction<string>>;
  creditCardType: string | null;
  setCreditCardType: React.Dispatch<React.SetStateAction<string>>;
  creditCardExpire: string | null;
  setCreditCardExpire: React.Dispatch<React.SetStateAction<string>>;
  creditCardNumber: string | null;
  setCreditCardNumber: React.Dispatch<React.SetStateAction<string>>;
  creditCardCVV: string | null;
  setCreditCardCVV: React.Dispatch<React.SetStateAction<string>>;
}
export const CheckoutContext = createContext({} as CheckoutContextProps)

const CheckoutContextProvider = (props: { children: React.ReactNode }) => {
  const [shippingAddress, setShippingAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [formFirstName, setFormFirstName] = useState('')
  const [formLastName, setFormLastName] = useState('')
  const [creditCardNameOnCard, setCreditCardNameOnCard] = useState('')
  const [creditCardType, setCreditCardType] = useState('')
  const [creditCardExpire, setCreditCardExpire] = useState('')
  const [creditCardNumber, setCreditCardNumber] = useState('')
  const [creditCardCVV, setCreditCardCVV] = useState('')

  return (
    <CheckoutContext.Provider value={{
      shippingAddress,
      setShippingAddress,
      city,
      setCity,
      state,
      setState,
      zip,
      setZip,
      country,
      setCountry,
      formFirstName,
      setFormFirstName,
      formLastName,
      setFormLastName,
      creditCardNameOnCard,
      setCreditCardNameOnCard,
      creditCardType,
      setCreditCardType,
      creditCardExpire,
      setCreditCardExpire,
      creditCardNumber,
      setCreditCardNumber,
      creditCardCVV,
      setCreditCardCVV
    }}>
      {props.children}
    </CheckoutContext.Provider>
  )

}
export default CheckoutContextProvider