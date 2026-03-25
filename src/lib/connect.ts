let txCharacteristic = null;

export async function connect() {
  const UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  const UART_TX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // write
  const UART_RX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // notify
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [UART_SERVICE] }],
    });
    
    device.addEventListener('gattserverdisconnected', () => {
      return false;
      txCharacteristic = null;
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(UART_SERVICE);
    txCharacteristic = await service.getCharacteristic(UART_TX);

    return true;
  } catch (err) {
    console.error('BLE error:', err);
    return false;
  }
}

export async function send(message) {
  if (!txCharacteristic) return;
  await txCharacteristic.writeValue(new TextEncoder().encode(message));
}
