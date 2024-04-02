import React from 'react';
import './App.scss';
import BilforsikringSkjema from './skjema/bilforsikring-skjema';

function App() {
    return (
        <div>
            <header>
                <h1>Kjøp Bilforsikring</h1>
                <p className="ingress">Det er fire forskjellige forsikringer å velge mellom. Ansvarsforsikring er
                    lovpålagt om kjøretøyet er
                    registrert og skal brukes på veien. I tillegg kan du utvide forsikringen avhengig av hvor gammel
                    bilen din
                    er og hvordan du bruker den.</p>
            </header>
            <main>
                <BilforsikringSkjema></BilforsikringSkjema>
            </main>
        </div>
    );
}

export default App;
