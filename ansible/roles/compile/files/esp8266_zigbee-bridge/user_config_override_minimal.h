#ifndef _USER_CONFIG_OVERRIDE_H_
#define _USER_CONFIG_OVERRIDE_H_

#ifdef CODE_IMAGE_STR
  #undef CODE_IMAGE_STR
#endif
#define CODE_IMAGE_STR "TasmoCompiler-zbbridge"

#ifdef USE_ENERGY_SENSOR
  #undef USE_ENERGY_SENSOR
#endif

#ifdef USE_MHZ19
  #undef USE_MHZ19
#endif

#ifdef USE_SENSEAIR
  #undef USE_SENSEAIR
#endif

#ifdef USE_PMS5003
  #undef USE_PMS5003
#endif

#ifdef USE_MGS
  #undef USE_MGS
#endif

#ifdef USE_NOVA_SDS
  #undef USE_NOVA_SDS
#endif

#ifdef USE_SGP30
  #undef USE_SGP30
#endif

#ifdef USE_CCS811
  #undef USE_CCS811
#endif

#ifdef USE_SCD30
  #undef USE_SCD30
#endif

#ifdef USE_SPS30
  #undef USE_SPS30
#endif

#ifdef USE_SEN5X
  #undef USE_SEN5X
#endif

#ifdef USE_HPMA
  #undef USE_HPMA
#endif

#ifdef USE_IAQ
  #undef USE_IAQ
#endif

#ifdef USE_T67XX
  #undef USE_T67XX
#endif

#ifdef USE_VINDRIKTNING
  #undef USE_VINDRIKTNING
#endif

#ifdef USE_SCD40
  #undef USE_SCD40
#endif

#ifdef USE_HM330X
  #undef USE_HM330X
#endif

#ifdef USE_EMULATION
  #undef USE_EMULATION
#endif

#ifdef USE_EMULATION_HUE
  #undef USE_EMULATION_HUE
#endif

#ifdef USE_EMULATION_WEMO
  #undef USE_EMULATION_WEMO
#endif

#ifdef USE_TASMOTA_CLIENT
  #undef USE_TASMOTA_CLIENT
#endif

#ifdef USE_ADC_VCC
  #undef USE_ADC_VCC
#endif
#define USE_ADC_VCC

#ifdef USE_SR04
  #undef USE_SR04
#endif

#ifdef USE_VL53L0X
  #undef USE_VL53L0X
#endif

#ifdef USE_HRXL
  #undef USE_HRXL
#endif

#ifdef USE_DYP
  #undef USE_DYP
#endif

#ifdef USE_VL53L1X
  #undef USE_VL53L1X
#endif

#ifdef USE_DOMOTICZ
  #undef USE_DOMOTICZ
#endif

#ifdef USE_HLW8012
  #undef USE_HLW8012
#endif

#ifdef USE_CSE7766
  #undef USE_CSE7766
#endif

#ifdef USE_PZEM004T
  #undef USE_PZEM004T
#endif

#ifdef USE_MCP39F501
  #undef USE_MCP39F501
#endif

#ifdef USE_PZEM_AC
  #undef USE_PZEM_AC
#endif

#ifdef USE_PZEM_DC
  #undef USE_PZEM_DC
#endif

#ifdef USE_ADE7953
  #undef USE_ADE7953
#endif

#ifdef USE_SDM120
  #undef USE_SDM120
#endif

#ifdef USE_DDS2382
  #undef USE_DDS2382
#endif

#ifdef USE_SDM630
  #undef USE_SDM630
#endif

#ifdef USE_DDSU666
  #undef USE_DDSU666
#endif

#ifdef USE_SOLAX_X1
  #undef USE_SOLAX_X1
#endif

#ifdef USE_LE01MR
  #undef USE_LE01MR
#endif

#ifdef USE_BL09XX
  #undef USE_BL09XX
#endif

#ifdef USE_TELEINFO
  #undef USE_TELEINFO
#endif

#ifdef USE_IEM3000
  #undef USE_IEM3000
#endif

#ifdef USE_WE517
  #undef USE_WE517
#endif

#ifdef USE_ENERGY_DUMMY
  #undef USE_ENERGY_DUMMY
#endif

#ifdef USE_HOME_ASSISTANT
  #undef USE_HOME_ASSISTANT
#endif

#ifdef USE_I2C
  #undef USE_I2C
#endif

#ifdef USE_MCP230xx
  #undef USE_MCP230xx
#endif

#ifdef USE_MCP230xx_OUTPUT
  #undef USE_MCP230xx_OUTPUT
#endif

#ifdef USE_MCP230xx_DISPLAYOUTPUT
  #undef USE_MCP230xx_DISPLAYOUTPUT
#endif

#ifdef USE_IR_REMOTE
  #undef USE_IR_REMOTE
#endif

#ifdef USE_IR_REMOTE_FULL
  #undef USE_IR_REMOTE_FULL
#endif

#ifdef USE_KNX
  #undef USE_KNX
#endif

#ifdef USE_BH1750
  #undef USE_BH1750
#endif

#ifdef USE_VEML6070
  #undef USE_VEML6070
#endif

#ifdef USE_TSL2561
  #undef USE_TSL2561
#endif

#ifdef USE_SI1145
  #undef USE_SI1145
#endif

#ifdef USE_APDS9960
  #undef USE_APDS9960
#endif

#ifdef USE_VEML6075
  #undef USE_VEML6075
#endif

#ifdef USE_MAX44009
  #undef USE_MAX44009
#endif

#ifdef USE_TSL2591
  #undef USE_TSL2591
#endif

#ifdef USE_AS3935
  #undef USE_AS3935
#endif

#ifdef USE_VEML7700
  #undef USE_VEML7700
#endif

#ifdef USE_DISCOVERY
  #undef USE_DISCOVERY
#endif

#ifdef USE_MODBUSBRIDGE
  #undef USE_MODBUSBRIDGE
#endif

#ifdef USE_MODBUSBRIDGE_TCP
  #undef USE_MODBUSBRIDGE_TCP
#endif

#ifdef USE_MQTT_TLS
  #undef USE_MQTT_TLS
#endif

#ifdef USE_RC_SWITCH
  #undef USE_RC_SWITCH
#endif

#ifdef USE_RULES
  #undef USE_RULES
#endif
#define USE_RULES

#ifdef USE_EXPRESSION
  #undef USE_EXPRESSION
#endif
#define USE_EXPRESSION

#ifdef SUPPORT_IF_STATEMENT
  #undef SUPPORT_IF_STATEMENT
#endif
#define SUPPORT_IF_STATEMENT

#ifdef USE_SCRIPT
  #undef USE_SCRIPT
#endif

#ifdef USE_UFILESYS
  #undef USE_UFILESYS
#endif

#ifdef USE_SDCARD
  #undef USE_SDCARD
#endif

#ifdef GUI_TRASH_FILE
  #undef GUI_TRASH_FILE
#endif

#ifdef GUI_EDIT_FILE
  #undef GUI_EDIT_FILE
#endif

#ifdef USE_SHUTTER
  #undef USE_SHUTTER
#endif

#ifdef USE_SPI
  #undef USE_SPI
#endif

#ifdef USE_SONOFF_SC
  #undef USE_SONOFF_SC
#endif

#ifdef USE_DS18x20
  #undef USE_DS18x20
#endif

#ifdef USE_DHT
  #undef USE_DHT
#endif

#ifdef USE_SHT
  #undef USE_SHT
#endif

#ifdef USE_HTU
  #undef USE_HTU
#endif

#ifdef USE_BMP
  #undef USE_BMP
#endif

#ifdef USE_SHT3X
  #undef USE_SHT3X
#endif

#ifdef USE_LM75AD
  #undef USE_LM75AD
#endif

#ifdef USE_AZ7798
  #undef USE_AZ7798
#endif

#ifdef USE_MAX31855
  #undef USE_MAX31855
#endif

#ifdef USE_MLX90614
  #undef USE_MLX90614
#endif

#ifdef USE_MAX31865
  #undef USE_MAX31865
#endif

#ifdef USE_HIH6
  #undef USE_HIH6
#endif

#ifdef USE_DHT12
  #undef USE_DHT12
#endif

#ifdef USE_DS1624
  #undef USE_DS1624
#endif

#ifdef USE_AHT1x
  #undef USE_AHT1x
#endif

#ifdef USE_HDC1080
  #undef USE_HDC1080
#endif

#ifdef USE_MCP9808
  #undef USE_MCP9808
#endif

#ifdef USE_HP303B
  #undef USE_HP303B
#endif

#ifdef USE_LMT01
  #undef USE_LMT01
#endif

#ifdef USE_AM2320
  #undef USE_AM2320
#endif

#ifdef USE_TIMERS
  #undef USE_TIMERS
#endif
#define USE_TIMERS

#ifdef USE_TUYA_MCU
  #undef USE_TUYA_MCU
#endif

#ifdef USE_WEBSERVER
  #undef USE_WEBSERVER
#endif
#define USE_WEBSERVER

#ifdef USE_WS2812
  #undef USE_WS2812
#endif

#ifdef MODULE
  #undef MODULE
#endif
#define MODULE	SONOFF_ZB_BRIDGE

#ifdef FALLBACK_MODULE
  #undef FALLBACK_MODULE
#endif
#define FALLBACK_MODULE	SONOFF_ZB_BRIDGE

#ifdef SERIAL_LOG_LEVEL
  #undef SERIAL_LOG_LEVEL
#endif
#define SERIAL_LOG_LEVEL	LOG_LEVEL_NONE

#ifdef USE_ARDUINO_OTA
  #undef USE_ARDUINO_OTA
#endif

#ifdef USE_TASMOTA_DISCOVERY
  #undef USE_TASMOTA_DISCOVERY
#endif
#define USE_TASMOTA_DISCOVERY

#ifdef UPGRADE_V8_MIN
  #undef UPGRADE_V8_MIN
#endif
#define UPGRADE_V8_MIN

#ifdef USE_ENHANCED_GUI_WIFI_SCAN
  #undef USE_ENHANCED_GUI_WIFI_SCAN
#endif

#ifdef USE_EMULATION_HUE
  #undef USE_EMULATION_HUE
#endif
#define USE_EMULATION_HUE

#ifdef USE_EMULATION_WEMO
  #undef USE_EMULATION_WEMO
#endif

#ifdef USE_CUSTOM
  #undef USE_CUSTOM
#endif

#ifdef USE_DISCOVERY
  #undef USE_DISCOVERY
#endif

#ifdef ROTARY_V1
  #undef ROTARY_V1
#endif

#ifdef USE_SONOFF_RF
  #undef USE_SONOFF_RF
#endif

#ifdef USE_RF_FLASH
  #undef USE_RF_FLASH
#endif

#ifdef USE_SONOFF_SC
  #undef USE_SONOFF_SC
#endif

#ifdef USE_TUYA_MCU
  #undef USE_TUYA_MCU
#endif

#ifdef USE_PS_16_DZ
  #undef USE_PS_16_DZ
#endif

#ifdef USE_SONOFF_IFAN
  #undef USE_SONOFF_IFAN
#endif

#ifdef USE_BUZZER
  #undef USE_BUZZER
#endif

#ifdef USE_ARILUX_RF
  #undef USE_ARILUX_RF
#endif

#ifdef USE_SHUTTER
  #undef USE_SHUTTER
#endif

#ifdef USE_DEEPSLEEP
  #undef USE_DEEPSLEEP
#endif

#ifdef USE_EXS_DIMMER
  #undef USE_EXS_DIMMER
#endif

#ifdef USE_HOTPLUG
  #undef USE_HOTPLUG
#endif

#ifdef USE_DEVICE_GROUPS
  #undef USE_DEVICE_GROUPS
#endif

#ifdef USE_PWM_DIMMER
  #undef USE_PWM_DIMMER
#endif

#ifdef USE_PWM_DIMMER_REMOTE
  #undef USE_PWM_DIMMER_REMOTE
#endif

#ifdef USE_KEELOQ
  #undef USE_KEELOQ
#endif

#ifdef USE_SONOFF_D1
  #undef USE_SONOFF_D1
#endif

#ifdef USE_LIGHT
  #undef USE_LIGHT
#endif

#ifdef USE_LIGHT_VIRTUAL_CT
  #undef USE_LIGHT_VIRTUAL_CT
#endif

#ifdef USE_WS2812
  #undef USE_WS2812
#endif

#ifdef USE_MY92X1
  #undef USE_MY92X1
#endif

#ifdef USE_SM16716
  #undef USE_SM16716
#endif

#ifdef USE_SM2135
  #undef USE_SM2135
#endif

#ifdef USE_SONOFF_L1
  #undef USE_SONOFF_L1
#endif

#ifdef USE_ELECTRIQ_MOODL
  #undef USE_ELECTRIQ_MOODL
#endif

#ifdef USE_LIGHT_PALETTE
  #undef USE_LIGHT_PALETTE
#endif

#ifdef USE_SHELLY_DIMMER
  #undef USE_SHELLY_DIMMER
#endif

#ifdef USE_COUNTER
  #undef USE_COUNTER
#endif

#ifdef USE_DS18x20
  #undef USE_DS18x20
#endif

#ifdef USE_SPI
  #undef USE_SPI
#endif

#ifdef USE_DISPLAY
  #undef USE_DISPLAY
#endif

#ifdef USE_MHZ19
  #undef USE_MHZ19
#endif

#ifdef USE_SENSEAIR
  #undef USE_SENSEAIR
#endif

#ifdef USE_PMS5003
  #undef USE_PMS5003
#endif

#ifdef USE_NOVA_SDS
  #undef USE_NOVA_SDS
#endif

#ifdef USE_HPMA
  #undef USE_HPMA
#endif

#ifdef USE_SR04
  #undef USE_SR04
#endif

#ifdef USE_DYP
  #undef USE_DYP
#endif

#ifdef USE_SERIAL_BRIDGE
  #undef USE_SERIAL_BRIDGE
#endif

#ifdef USE_MP3_PLAYER
  #undef USE_MP3_PLAYER
#endif

#ifdef USE_AZ7798
  #undef USE_AZ7798
#endif

#ifdef USE_PN532_HSU
  #undef USE_PN532_HSU
#endif

#ifdef USE_RDM6300
  #undef USE_RDM6300
#endif

#ifdef USE_IBEACON
  #undef USE_IBEACON
#endif

#ifdef USE_GPS
  #undef USE_GPS
#endif

#ifdef USE_HM10
  #undef USE_HM10
#endif

#ifdef USE_BLE_ESP32
  #undef USE_BLE_ESP32
#endif

#ifdef USE_MI_ESP32
  #undef USE_MI_ESP32
#endif

#ifdef USE_HRXL
  #undef USE_HRXL
#endif

#ifdef USE_TASMOTA_CLIENT
  #undef USE_TASMOTA_CLIENT
#endif

#ifdef USE_OPENTHERM
  #undef USE_OPENTHERM
#endif

#ifdef USE_MIEL_HVAC
  #undef USE_MIEL_HVAC
#endif

#ifdef USE_PROJECTOR_CTRL
  #undef USE_PROJECTOR_CTRL
#endif

#ifdef USE_ENERGY_SENSOR
  #undef USE_ENERGY_SENSOR
#endif

#ifdef USE_ADE7953
  #undef USE_ADE7953
#endif

#ifdef USE_PZEM004T
  #undef USE_PZEM004T
#endif

#ifdef USE_PZEM_AC
  #undef USE_PZEM_AC
#endif

#ifdef USE_PZEM_DC
  #undef USE_PZEM_DC
#endif

#ifdef USE_MCP39F501
  #undef USE_MCP39F501
#endif

#ifdef USE_SDM72
  #undef USE_SDM72
#endif

#ifdef USE_SDM120
  #undef USE_SDM120
#endif

#ifdef USE_SDM230
  #undef USE_SDM230
#endif

#ifdef USE_SDM630
  #undef USE_SDM630
#endif

#ifdef USE_DDS2382
  #undef USE_DDS2382
#endif

#ifdef USE_DDSU666
  #undef USE_DDSU666
#endif

#ifdef USE_SOLAX_X1
  #undef USE_SOLAX_X1
#endif

#ifdef USE_LE01MR
  #undef USE_LE01MR
#endif

#ifdef USE_TELEINFO
  #undef USE_TELEINFO
#endif

#ifdef USE_IEM3000
  #undef USE_IEM3000
#endif

#ifdef USE_WE517
  #undef USE_WE517
#endif

#ifdef USE_DHT
  #undef USE_DHT
#endif

#ifdef USE_MAX31855
  #undef USE_MAX31855
#endif

#ifdef USE_MAX31865
  #undef USE_MAX31865
#endif

#ifdef USE_IR_REMOTE
  #undef USE_IR_REMOTE
#endif

#ifdef USE_TM1638
  #undef USE_TM1638
#endif

#ifdef USE_HX711
  #undef USE_HX711
#endif

#ifdef USE_TX20_WIND_SENSOR
  #undef USE_TX20_WIND_SENSOR
#endif

#ifdef USE_TX23_WIND_SENSOR
  #undef USE_TX23_WIND_SENSOR
#endif

#ifdef USE_WINDMETER
  #undef USE_WINDMETER
#endif

#ifdef USE_RC_SWITCH
  #undef USE_RC_SWITCH
#endif

#ifdef USE_RF_SENSOR
  #undef USE_RF_SENSOR
#endif

#ifdef USE_HRE
  #undef USE_HRE
#endif

#ifdef USE_A4988_STEPPER
  #undef USE_A4988_STEPPER
#endif

#ifdef USE_THERMOSTAT
  #undef USE_THERMOSTAT
#endif

#ifdef DEBUG_THEO
  #undef DEBUG_THEO
#endif

#ifdef USE_DEBUG_DRIVER
  #undef USE_DEBUG_DRIVER
#endif

#ifdef USE_ZIGBEE
  #undef USE_ZIGBEE
#endif
#define USE_ZIGBEE

#ifdef USE_ZIGBEE_ZNP
  #undef USE_ZIGBEE_ZNP
#endif

#ifdef USE_ZIGBEE_EZSP
  #undef USE_ZIGBEE_EZSP
#endif
#define USE_ZIGBEE_EZSP

#ifdef USE_ZIGBEE_EEPROM
  #undef USE_ZIGBEE_EEPROM
#endif
#define USE_ZIGBEE_EEPROM

#ifdef USE_TCP_BRIDGE
  #undef USE_TCP_BRIDGE
#endif
#define USE_TCP_BRIDGE

#ifdef USE_ZIGBEE_CHANNEL
  #undef USE_ZIGBEE_CHANNEL
#endif
#define USE_ZIGBEE_CHANNEL	11

#ifdef USE_ZIGBEE_COALESCE_ATTR_TIMER
  #undef USE_ZIGBEE_COALESCE_ATTR_TIMER
#endif
#define USE_ZIGBEE_COALESCE_ATTR_TIMER	350

#ifdef MY_LANGUAGE
  #undef MY_LANGUAGE
#endif
#define MY_LANGUAGE	en_GB


#endif
