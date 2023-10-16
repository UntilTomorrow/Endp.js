const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
//const mysql = require('mysql');
const port = 3000;
const qs = require('qs');


//////////Koneksi//////////////
/*
const conn = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'mysql',
  database: 'dbjs'
});

*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/', (req, res) => {
        let CU  = req.body.data
        console.log(CU)
        res.status(200).send({ message: 'Data berhasil diterima dan disimpan CRM' }); 
   });
app.get('/contactus', (req, res) => {
        const contactData = req.body;
        console.log(' inputan:', contactData);
        const axios = require('axios');
        const xsrfToken = 'f02f20f9d4599d080e48c2dc754ba62e';
        const axiosConfig = {
                headers: {
                  'X-XSRF-TOKEN': xsrfToken, 
                },
              };
        axios
          .get('http://192.168.100.105/perfex_crm/authentication/contactus2', qs.stringify(contactData), axiosConfig)
          .then((response) => {
            console.log('Respon dari Web 2 :', response.data);
            res.status(200).send({ message: 'Data berhasil diterima dan disimpan CRM.' });
          })
          .catch((error) => {
            console.error('Error saat mengirim data CRM:', error);
            res.status(500).send({ message: 'Gagal mengirim data CRM.' });
          });
    });


    //////////////////////////////////////
  app.get('/api', (req, res) => {
      const contactData = {
        Authorization: 'f02f20f9d4599d080e48c2dc754ba62e',
        data: {
          source: '1',
          status: '2',
          name: 'Name',
        },
      };
    
      console.log('Inputan:', contactData);
    
      const xsrfToken = 'f02f20f9d4599d080e48c2dc754ba62e';
    
      const axiosConfig = {
        headers: {
          'X-XSRF-TOKEN': xsrfToken,
        },
      };
    
      axios
        .get('http://192.168.100.105/perfex_crm/authentication/contactus2', {
          params: contactData, 
        })
        .then((response) => {
          console.log('Respon dari Web 2:', response.data);
          res.status(200).send({ message: 'Data berhasil diterima dan disimpan CRM.' });
        })
        .catch((error) => {
          console.error('Error saat mengirim data CRM:', error);
          res.status(500).send({ message: 'Gagal mengirim data CRM.' });
        });
    });
  
      
app.listen(port, () => console.log('running http://localhost:' + port));
