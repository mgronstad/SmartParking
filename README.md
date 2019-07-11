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

For more detailed instructions, [Twilio's Developer Kit Setup Quickstart](https://www.twilio.com/wireless/narrowband/devkit)

1. Register the narrowband SIM with Twilio
------------------------------------------
The following steps will allow you to activate your SIM on the network and create a Narrowband Rate Plan. Remove the Twilio Narrowband SIM from the Developer Kit. Log into Twilio and [register your narrowband SIM](https://www.twilio.com/docs/wireless/quickstart/alfa-developer-kit#step-1-register-your-narrowband-sim).
* __Enter registration code__: Registers your starter SIM to your Twilio Account
* __Choose a Unique Name for your SIM__: Allows you to identify this particular SIM within the SIMs section of the Twilio Console
* __Create a Rate Plan__: Monitors and regulates the SIM's usage
* __Activate the SIM__: Activate your SIM on the T-Mobile Network

2. Set up the Hardware
----------------------
Pop out the nano form factor (the smallest form) of the Narrowband SIM and insert the SIM into the Developer board. Connect the LTE antenna. Plug in the micro USB cable into the board and insert the other end of the cable into a USB port on a computer. Plug in the lithium battery. Using the additional cabling, plug in the Grove Ultrasonic Ranger into port D38. 

What do I want to do in this read me?
    Introduction to the product/project
    Explain a little bit about the dev kit
    Why is NB-IoT so cool??
    Explain the logistics of the project
        On a basic scale what is happening?