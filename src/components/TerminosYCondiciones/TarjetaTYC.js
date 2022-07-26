import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

export default function TarjetaTYC() {

    const [consent, setConsent] = useState(JSON.parse(sessionStorage.getItem('consent')));

    const saveConsent = () => {
        setConsent(true)
        sessionStorage.setItem('consent', JSON.stringify(consent));
    }

    return (
        <Dialog
            open={!consent}
        >
            <DialogTitle>
                Terminos y condiciones. Aviso de privacidad.
            </DialogTitle>
            <DialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam consequuntur quaerat eveniet iure magni, amet sed dolore quasi earum perferendis dolorum vero praesentium nulla tenetur? Earum possimus consequuntur fuga enim.
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { }}>Leer más</Button>
                <Button autoFocus onClick={saveConsent} >Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}