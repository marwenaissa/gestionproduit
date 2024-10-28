const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplace par ton utilisateur MySQL
    password: '', // Remplace par ton mot de passe MySQL
    database: 'gestionproduit', // Remplace par le nom de ta base de données
    port: 3306 // Si tu utilises un port différent, remplace 3306 par ton port

});

// Route pour récupérer tous les produits
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Route pour ajouter un produit
app.post('/products', (req, res) => {
    const product = req.body;
    db.query('INSERT INTO products SET ?', product, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, ...product });
    });
});

// Route pour mettre à jour un produit
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = req.body;
    db.query('UPDATE products SET ? WHERE id = ?', [product, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json(product);
    });
});

// Route pour supprimer un produit
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM products WHERE id = ?', id, (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    });
});

app.listen(port, () => {
    console.log(`API en écoute sur http://localhost:${port}`);
});
