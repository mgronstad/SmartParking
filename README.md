NB-IoT Smart Parking System
===========================

An Introduction to NB-IoT
-------------------------

### Definitions

1. **Narrowband IoT** (aka NB-IoT or LTE-M2) is a cellular technology that specializes in communication between objects which require small amounts of data, over long periods, in hard to reach places. More specifically, NB-IoT is a LPWAN technology which works virtually everywhere.

2. **LPWAN** stands for low-power wide area network. This is a wireless wide area network technology that interconnects low-bandwidth, battery-powered devices with low bit rates over long ranges.

### More about NB-IoT
NB-IoT operates outside of the licensed LTE construct. Instead, it works either 1) independently, 2) in unused 200-kHz bands that have previously been used for GSM - Global System for Mobile Communications, or 3) on LE base stations which offer a resource block to NB-IoT operations or in their guard bands.

### Benefits of NB-IoT
1. Power Efficiency
2. Cost Savings
3. Reliability
4. Wider Deployment
5. Global Reach

NB-IoT applications and solutions stretch across the board. From asset tracking to smart cities to fleet and smart buildings, this technology unlocks game-changing results. To demonstrate the practice of this concept, we can build our own full-stack prototype of a NB-IoT smart parking system utilizing T-Mobile's Narrowband Network and the Twilio NB-IoT DevKit and Breakout SDK.

Requirements
------------
### Hardware
* Twilio Narrowband IoT 'Alfa' Developer Board and Kit
  * Twilio Narrowband Developer Board
  * Twilio + T-Mobile USA Narrowband SIM
  * Lithium Battery
  * LTE Antenna
  * Micro-USB Cable
  * Ultrasonic Range Sensor
  * Additional Cabling
  Extra documentation on the board can be found [here](https://github.com/SeeedDocument/wiki_english/blob/master/docs/Wio_LTE_Cat_M1_NB-IoT_Tracker.md).

### Software
* Arduino IDE
* Twilio Breakout SDK
* Visual Studio Code
* Node.js
* More software? Double check

### Accounts
* Twilio
* AWS (Amazon Web Services) free 1-year subscription
* More accounts? Double check

For more detailed instructions corresponding to steps 1-4 see [Twilio's Developer Kit Setup Quickstart](https://www.twilio.com/wireless/narrowband/devkit)

## 1. Register the narrowband SIM with Twilio
The following steps will allow you to activate your SIM on the network and create a Narrowband Rate Plan. Log into Twilio and [register your narrowband SIM](https://www.twilio.com/docs/wireless/quickstart/alfa-developer-kit#step-1-register-your-narrowband-sim).

  * __Enter registration code__: Registers your starter SIM to your Twilio Account

  * __Choose a Unique Name for your SIM__: Allows you to identify this particular SIM within the SIMs section of the Twilio Console

   * __Create a Rate Plan__: Monitors and regulates the SIM's usage

   * __Activate the SIM__: Activate your SIM on the T-Mobile Network

## 2. Set up the Hardware
The following steps lay out the hardware instructions for the NB-IoT 'Alfa' Developer Kit.
* __Insert the SIM into the development board__: Pop out the nano form factor (the *smallest* form) of the Narrowband SIM and insert the SIM into the bottom of the two slots available.

* __Connect the LTE antenna__: The black rectangular LTE antenna gets connected to the pin labeled LTE on the back of the board.

* __Plug in the USB cable__: Insert the micro USB cable into the board and plug the other end of the cable into a USB port on a computer.

* __Plug in the lithium battery__: Insert the JST connector of the lithium battery into the battery port to the right of the micro USB port. It is recommended that the lithium battery be plugged in at all times, especially if USB power source does not provide sufficient power for the board at peak levels.

* __Attach the Ultrasonic Sensor__: Using the additional cabling, plug in the Grove Ultrasonic Ranger into port D38. 

## 3. Verify your board connects to the T-Mobile network
It may take a few minutes for the SIM to connect to the network for the first time. The network LED (indicated by NET) will initially be orange. Once the SIM is connected, the light will turn blue.

If the LED doesn't turn blue, try another location.

If the device doesn't attach to the network in approximatey three minutes, reboot the device and try again.

## 4. Set up the software environment

### Download and install the Breakout SDK
The Breakout SDK can be found on Github. Download the [Breakout_Arduino_Library.zip](https://github.com/twilio/Breakout_Arduino_Library#setting-up-your-development-environment). Open the Arduino IDE and add the .zip to the Arduino IDE Library.

   Go to *Sketch > Include Library > Add .ZIP Library* and select the corresponding zip

### Download and install the corresponding board cores
To develop on the board, you need to download the following cores in the Arduino IDE.

Go to *Arduino > Preferences* and copy the following URL into the Additional Boards Manager URLs field: <https://raw.githubusercontent.com/Seeed-Studio/Seeed_Platform/master/package_seeeduino_boards_index.json>
   
   
Open *Tools > Board > Boards Manager* and search for "Seeed" and select the "Seeed STM32F4 Boards" version 1.2.3+ and click install. Restart the Arduino IDE.
   
To select the board you are using, click *Tools > Board > Wio Tracker LTE*.
   
Click *Tools > Post > {Your Modem Port Here}* this selects the correct port. The port selected will be different depending upon the laptop:
    
   * **OSX**: /dev/{cu|tty}.usbmodem{XXX}
    
   * **Linux**: /dev/ttyACM{X}
    
   * **Windows**: COM{X}

## 5. Create the sketch to be uploaded to the Dev kit
The Breakout Arduino Library offers several example sketches for getting started with the various sensors. For this project, we will be adapting the Ultrasonic sensor code. Start by opening the Ultrasonic example.

Click *File > Examples > Breakout Arduino Library > Sensors > Ultrasonic* to open the Ultrasonic sketch:

```javascript
#include <board.h>
#include <BreakoutSDK.h>
// Install https://github.com/Seeed-Studio/Grove_Ultrasonic_Ranger
#include <Ultrasonic.h>

/** Change this to your device purpose */
static const char *device_purpose = "Dev-Kit";
/** Change this to your key for the SIM card inserted in this device 
 *  You can find your PSK under the Breakout SDK tab of your Narrowband SIM detail at
 *  https://www.twilio.com/console/wireless/sims
*/
static const char *psk_key = "00112233445566778899aabbccddeeff";

/** This is the Breakout SDK top API */
Breakout *breakout = &Breakout::getInstance();

#define ULTRASONIC_PIN  (38)
#define INTERVAL        (1000)

Ultrasonic UltrasonicRanger(ULTRASONIC_PIN);

/**
 * Setting up the Arduino platform. This is executed once, at reset.
 */
void setup() {

  pinMode(38, INPUT);
  
  // Feel free to change the log verbosity. E.g. from most critical to most verbose:
  //   - errors: L_ALERT, L_CRIT, L_ERR, L_ISSUE
  //   - warnings: L_WARN, L_NOTICE
  //   - information & debug: L_INFO, L_DB, L_DBG, L_MEM
  // When logging, the additional L_CLI level ensure that the output will always be visible, no matter the set level.
  owl_log_set_level(L_INFO);
  LOG(L_WARN, "Arduino setup() starting up\r\n");

  // Set the Breakout SDK parameters
  breakout->setPurpose(device_purpose);
  breakout->setPSKKey(psk_key);
  breakout->setPollingInterval(10 * 60);  // Optional, by default set to 10 minutes
  
  // Powering the modem and starting up the SDK
  LOG(L_WARN, "Powering on module and registering...");
  breakout->powerModuleOn();
  
  LOG(L_WARN, "... done powering on and registering.\r\n");
  LOG(L_WARN, "Arduino loop() starting up\r\n");
}


/**
 * This is just a simple example to send a command and write out the status to the console.
 */
 
void sendCommand(const char * command) {
  if (breakout->sendTextCommand(command) == COMMAND_STATUS_OK) {
    LOG(L_INFO, "Tx-Command [%s]\r\n", command);
  } else {
    LOG(L_INFO, "Tx-Command ERROR\r\n");
  }
}

void loop()
{
  long distance;
  distance = UltrasonicRanger.MeasureInCentimeters();
  if (distance < 10){
    char message[] = "Object is within 10cm of sensor";
    sendCommand(message);
  } else {
    LOG(L_INFO, "Object is [%ld] CM from the sensor\r\n", distance );
  }
  
  breakout->spin();
  
  delay(INTERVAL);
}
```
For the code to be valid, you need to include the Ultrasonic library. Follow the commented link

`// Install [https://github.com/Seeed-Studio/Grove_Ultrasonic_Ranger](https://github.com/Seeed-Studio/Grove_Ultrasonic_Ranger)` at the top of the code, download it as a zip file, and then add it to your Arduino IDE.

### Modifications to the Ultrasonic Sketch

#### Within the preprocessor directives
Substitute the first line `#include <board.h>` with the corresponding board library by going to *Sketch > Include Library > Wio LTE Arduino Library*, that first line should be replaced with:
```javascript
#include <board_config.h>
#include <ethernet.h>
#include <gnss.h>
#include <stm32f4_ws2812.h>
#include <UART_Interface.h>
#include <wio_tracker.h>
```

Modify the device purpose so that it is specific to this project, i.e. *Smart Parking Ultrasonic Detection*:
```javascript
static const char *device_purpose = "Smart Parking Ultrasonic Detection";
```

Then change the value of psk_key so that it matches the **pre-shared key specific to your SIM**. To find your psk_key, log into your Twilio account:

*Programmable Wireless > SIMs > your SIM's unique name > Breakout SDK > Pre-Shared Key*:
```javascript
static const char *psk_key = "Your Pre-Shared Key Here";
```

Above the `#define` lines add:
```javascript
WS2812 strip = WS2812(1, RGB_LED_PIN);
```
This will make your LED start off as yellow, it will transition to green once registration and connection is done.

Then, right above the `void setup()`, add the following:

```javascript
void enableLed()
{
    pinMode(RGB_LED_PWR_PIN, OUTPUT);
    digitalWrite(RGB_LED_PWR_PIN, HIGH);
    strip.begin();
    strip.brightness = 5;
}
```
#### Within the setup function
The following modifications are made within the `void setup()`

After the line `LOG(L_WARN, "Arduino setup() starting up\r\n");` add the following which will change the RGB-LED to yellow:
```javascript
enableLed();
strip.WS2812SetRGB(0, 0x20, 0x20, 0x00);
strip.WS2812Send();
```

After the line `breakout->powerModuleOn();` insert the following block of code:
```javascript
const char command[] = "LED Parking Sensor Activator";
if(breakout->sendTextCommand(command) == COMMAND_STATUS_OK) {
  LOG(L_INFO, "Tx-Command [%s]\r\n", command);
}
else
{
  LOG(L_INFO, "Tx-Command ERROR\r\n");
}
```

After `LOG(L_WARN, "Arduino loop() starting up\r\n");`
add the following to change the RGB-LED to green signaling that registration and connection is done:
```javascript
  strip.WS2812SetRGB(0, 0x00, 0x40, 0x00);
  strip.WS2812Send();
```

#### Within the loop function
The following modifications are made within the `void loop()`
Get rid of the if/else statement already written within the loop and replace it with the following:
```javascript
  if(distance < 20)
  {
    // Change to red because spot is occupied
    strip.WS2812SetRGB(0, 0x40, 0x00, 0x00);
    strip.WS2812Send();
    LOG(L_INFO, "Object is [%ld] CM from the sensor.\r\n", distance);
    char message[] = "occupied";
    sendCommand(message); 
  }
  else
  {
    // Set RGB-LED to green because spot is open
    strip.WS2812SetRGB(0, 0x00, 0x40, 0x00);
    strip.WS2812Send();
    LOG(L_INFO, "Object is [%ld] CM from the sensor.\r\n", distance);
    char message[] = "unoccupied";
    sendCommand(message);
  }
```
## 6. Finished Sketch

With all of the modifications, the finished code should look as follows:

```javascript
#include <board_config.h>
#include <ethernet.h>
#include <gnss.h>
#include <stm32f4_ws2812.h>
#include <UART_Interface.h>
#include <wio_tracker.h>
#include <BreakoutSDK.h>
// Install https://github.com/Seeed-Studio/Grove_Ultrasonic_Ranger
#include <Ultrasonic.h>

/** Change this to your device purpose */
static const char *device_purpose = "Smart Parking Ultrasonic Detection";
/** Change this to your key for the SIM card inserted in this device 
 *  You can find your PSK under the Breakout SDK tab of your Narrowband SIM detail at
 *  https://www.twilio.com/console/wireless/sims
*/
static const char *psk_key = "00112233445566778899aabbccddeeff";

/** This is the Breakout SDK top API */
Breakout *breakout = &Breakout::getInstance();

WS2812 strip = WS2812(1, RGB_LED_PIN);

#define ULTRASONIC_PIN  (38)
#define INTERVAL        (1000)

Ultrasonic UltrasonicRanger(ULTRASONIC_PIN);

void enableLed()
{
    pinMode(RGB_LED_PWR_PIN, OUTPUT);
    digitalWrite(RGB_LED_PWR_PIN, HIGH);
    strip.begin();
    strip.brightness = 5;
}

/**
 * Setting up the Arduino platform. This is executed once, at reset.
 */
void setup() {

  pinMode(38, INPUT);
  
  // Feel free to change the log verbosity. E.g. from most critical to most verbose:
  //   - errors: L_ALERT, L_CRIT, L_ERR, L_ISSUE
  //   - warnings: L_WARN, L_NOTICE
  //   - information & debug: L_INFO, L_DB, L_DBG, L_MEM
  // When logging, the additional L_CLI level ensure that the output will always be visible, no matter the set level.
  owl_log_set_level(L_INFO);
  LOG(L_WARN, "Arduino setup() starting up\r\n");

  enableLed();
  strip.WS2812SetRGB(0, 0x20, 0x20, 0x00);
  strip.WS2812Send();

  // Set the Breakout SDK parameters
  breakout->setPurpose(device_purpose);
  breakout->setPSKKey(psk_key);
  breakout->setPollingInterval(10 * 60);  // Optional, by default set to 10 minutes
  
  // Powering the modem and starting up the SDK
  LOG(L_WARN, "Powering on module and registering...");
  breakout->powerModuleOn();

  const char command[] = "LED Parking Sensor Activator";
  if(breakout->sendTextCommand(command) == COMMAND_STATUS_OK)
  {
    LOG(L_INFO, "Tx-Command [%s]\r\n", command);
  }
  else
  {
    LOG(L_INFO, "Tx-Command ERROR\r\n");
  }
  
  LOG(L_WARN, "... done powering on and registering.\r\n");
  LOG(L_WARN, "Arduino loop() starting up\r\n");

  strip.WS2812SetRGB(0, 0x00, 0x40, 0x00);
  strip.WS2812Send();
}


/**
 * This is just a simple example to send a command and write out the status to the console.
 */
 
void sendCommand(const char * command) {
  if (breakout->sendTextCommand(command) == COMMAND_STATUS_OK) {
    LOG(L_INFO, "Tx-Command [%s]\r\n", command);
  } else {
    LOG(L_INFO, "Tx-Command ERROR\r\n");
  }
}

void loop()
{
  long distance;
  distance = UltrasonicRanger.MeasureInCentimeters();
  if(distance < 20)
  {
    // Change to red because spot is occupied
    strip.WS2812SetRGB(0, 0x40, 0x00, 0x00);
    strip.WS2812Send();
    LOG(L_INFO, "Object is [%ld] CM from the sensor.\r\n", distance);
    char message[] = "occupied";
    sendCommand(message); 
  }
  else
  {
    // Set RGB-LED to green because spot is open
    strip.WS2812SetRGB(0, 0x00, 0x40, 0x00);
    strip.WS2812Send();
    LOG(L_INFO, "Object is [%ld] CM from the sensor.\r\n", distance);
    char message[] = "unoccupied";
    sendCommand(message);
  }
  
  breakout->spin();
  
  delay(INTERVAL);
}
```
