import React from 'react'
import './Dashboard.css'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Dashboard = ({ children }) => {
  return (
    <section className='dashboard'>
      <Header/>
      {children}
      <Footer />
    </section>
  )
}

export default Dashboard
