<script>
  // Nordic UART Service UUIDs
  const UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  const UART_TX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // write
  const UART_RX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // notify

  let connected = $state(false);
  let txCharacteristic = null;

  async function connect() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [UART_SERVICE] }],
      });

      device.addEventListener('gattserverdisconnected', () => {
        connected = false;
        txCharacteristic = null;
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(UART_SERVICE);
      txCharacteristic = await service.getCharacteristic(UART_TX);

      // Optionally subscribe to incoming data from the device
      const rxCharacteristic = await service.getCharacteristic(UART_RX);
      await rxCharacteristic.startNotifications();
      rxCharacteristic.addEventListener('characteristicvaluechanged', (e) => {
        const value = new TextDecoder().decode(e.target.value);
        console.log('Received:', value);
      });

      connected = true;
    } catch (err) {
      console.error('BLE error:', err);
    }
  }

  async function send(message) {
    if (!txCharacteristic) return;
    await txCharacteristic.writeValue(new TextEncoder().encode(message));
  }
</script>

{#if !connected}
  <button onclick={connect}>Connect to star tracker</button>
{:else}
  <button
    onmousedown={() => send('forwards')}
    onmouseup={() => send('stop')}
  >forwards</button>
  <button
    onmousedown={() => send('backwards')}
    onmouseup={() => send('stop')}
  >backwards</button>
{/if}
