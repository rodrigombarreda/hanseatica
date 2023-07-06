from flask import Flask, render_template, request, redirect, url_for, session,jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import json
import hashlib

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'dd'
mysql = MySQL(app)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
       "origins": "*"
    }
})


@app.route('/clientes',methods =['GET', 'POST'],strict_slashes=False)
def getAcces():
 if request.method == 'GET':
    cur = mysql.connection.cursor()
    cur.execute ('select a.id,a.nombre,a.pais from b_ter_clientes a')
    data = cur.fetchall() 
    result = []
    for row in data:
        content = {
                'id':row[0],
                'nombre': row[1],
                'pais': row[2]
            }
        result.append(content)
    return jsonify(result)
 elif request.method == 'POST':
    nombre = request.form['nombre']
    pais = request.form['pais']
    sistema = request.form['sistema']
    cur = mysql.connection.cursor()
    cur.callproc('b_ter_generar_cliente', [nombre, pais,sistema])
    
    data = cur.fetchall() 
    cur.close()
    mysql.connection.commit()
    result = []
    result.append(data)
 return jsonify(result)
 
@app.route('/login', methods =['GET', 'POST'],strict_slashes=False)
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
       username = request.form['username']
       password = request.form['password']
       global passwsa
       m = hashlib.md5()
       cur = mysql.connection.cursor()
       cur.execute ('select usuario,password from b_ter_usuarios where usuario='+'"'+username+'"')
       account = cur.fetchone()
       passwsa = md5hasher(password)
       if passwsa == account[1]:
        return jsonify("existe usuario",200)
       else: 
        return "no existe usuario",404; 
    else:
        return request.form
    
@app.route('/clientes/delete', methods =['POST'],strict_slashes=False)
def deleteCliente():
    id = request.form['id']
    cur = mysql.connection.cursor()
    cur.execute ('CALL dd.b_ter_eliminar_cliente('+id+')')
    mysql.connection.commit()
    data = cur.fetchall()
    return jsonify(data)

@app.route('/clientes/duplicar', methods =['POST'],strict_slashes=False)
def duplicarCliente():
    nombreOriginal = request.form['nombreOriginal']
    nombreNuevo = request.form['nombreNuevo']
    copiarUsuarios = request.form['copiarUsuarios']
    print(nombreOriginal,nombreNuevo,copiarUsuarios)
    cur = mysql.connection.cursor()
    cur.callproc('b_ter_copiar_cliente', [nombreOriginal, nombreNuevo,copiarUsuarios])
    data = cur.fetchall() 
    cur.close()
    mysql.connection.commit()
    result = []
    result.append(data)
    return jsonify(result)
    
def md5hasher(what_text):       
    return hashlib.md5(what_text.encode("utf")).hexdigest()


app.run(port=3000)


