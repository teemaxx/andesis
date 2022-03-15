# Documentation

## Packages

### **Node-red**

Install with `npm install -g node-red`.

Server runs by default on `http://127.0.0.1:1880/`

### **Mosquitto**

Install with `snap install mosquitto` or the Windows executable.

Responsible for brokering the messages between node-red and our devices.

---

## Directory structure

### **/devices**

Each file that ends with "-dev.js" in its filename represents an IoT device that is connected to our smart-home.

