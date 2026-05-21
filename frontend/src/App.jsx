import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {

    axios.get("/api/invoices")
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>InvoiceMate Dashboard</h1>

      {invoices.map((invoice) => (

        <div
          key={invoice.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px"
          }}
        >

          <h3>{invoice.client}</h3>

          <p>Amount: ${invoice.amount}</p>

          <p>Status: {invoice.status}</p>

        </div>

      ))}

    </div>
  );
}

export default App;
