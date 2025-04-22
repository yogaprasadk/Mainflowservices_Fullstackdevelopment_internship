from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = "secret"

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    category TEXT,
                    price REAL,
                    quantity INTEGER,
                    description TEXT)''')

    c.execute('''CREATE TABLE IF NOT EXISTS buyers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT,
                    phone TEXT,
                    address TEXT)''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM products")
    products = c.fetchall()
    c.execute("SELECT * FROM buyers")
    buyers = c.fetchall()
    conn.close()
    return render_template('index.html', products=products, buyers=buyers)

@app.route('/add-product', methods=['POST'])
def add_product():
    data = (
        request.form['name'],
        request.form['category'],
        float(request.form['price']),
        int(request.form['quantity']),
        request.form['description']
    )
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO products (name, category, price, quantity, description) VALUES (?, ?, ?, ?, ?)", data)
    conn.commit()
    conn.close()
    flash("Product added successfully!")
    return redirect(url_for('index'))

@app.route('/add-buyer', methods=['POST'])
def add_buyer():
    data = (
        request.form['name'],
        request.form['email'],
        request.form['phone'],
        request.form['address']
    )
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO buyers (name, email, phone, address) VALUES (?, ?, ?, ?)", data)
    conn.commit()
    conn.close()
    flash("Buyer added successfully!")
    return redirect(url_for('index'))

@app.route('/delete-product/<int:id>')
def delete_product(id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("DELETE FROM products WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    flash("Product deleted successfully!")
    return redirect(url_for('index'))

@app.route('/delete-buyer/<int:id>')
def delete_buyer(id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("DELETE FROM buyers WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    flash("Buyer deleted successfully!")
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
