import React, { useState } from "react";
import "./AppointmentForm-Styles.css";
import axios from "axios";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5050/appointments", {
                name,
                email,
                phone,
                date,
            });
            console.log(response);
            alert("Appointment saved successfully!");
        } catch (error) {
            console.error(error);
            alert("Error saving appointment");
        }
    };

    return (
        <div className="main">
            <h1>Appointment Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />

                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;