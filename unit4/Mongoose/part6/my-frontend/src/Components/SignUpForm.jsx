import { useState } from 'react'

const SignUpForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // THE CONNECTION HAPPENS HERE
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST', // we are creating data
                headers: {
                    'Content-Type' : 'application/json', // Tell express we are sending JSON
                }, 
                body: JSON.stringify(formData), // Convert js object to string
            });

            const data = await response.json();

            if(response.ok) {
                alert("Success! User Created: " + data.user.username);
                console.log("Server Response:", data);

                setFormData( {username: '', email: ''} );
            } else {
                alert("Error: " + data.message);
            }
        } catch(error) {
            console.log("Network Error:", error);
        }
    }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        <h2>Create User</h2>
        <input
            type='text'
            placeholder='Username'
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        
        <br /><br />

        <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <br /><br />

        <button type='submit'>Sign Up</button>
    </form>
  )
}

export default SignUpForm
