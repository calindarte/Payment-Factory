import PaymentForm from "../components/PaymentForm"

const Home = () => {
  return (
    <div className="p-4 dark:bg-zinc-600 dark:text-white py-24">
      <h1 className="text-2xl font-bold text-center mb-6">💳 Sistema de Pagos</h1>
      <PaymentForm />
    </div>
  )
}

export default Home
