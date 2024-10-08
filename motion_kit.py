from micropython import const
from machine import SoftI2C, Pin
from yolobit import *

robocon_servos_pos = {}

MK_DEFAULT_I2C_ADDRESS = 0x55

MK_REG_MOTOR_INDEX = const(0) # set motor speed - motor index
MK_REG_MOTOR_SPEED = const(2) # set motor speed - speed

MK_REG_MOTOR_BRAKE = const(4)

MK_REG_SERVO1 = const(6)
MK_REG_SERVO2 = const(8)
MK_REG_SERVO3 = const(10)
MK_REG_SERVO4 = const(12)
MK_REG_SERVOS = [MK_REG_SERVO1, MK_REG_SERVO2, MK_REG_SERVO3, MK_REG_SERVO4]

# Read-only registers
MK_REG_FW_VERSION     = const(16)
MK_REG_WHO_AM_I       = const(18)


# motor ports
MK_MOTOR_ALL = const(3)
MK_MOTOR_M1 = const(1)
MK_MOTOR_M2 = const(2)

MK_SERVO_S1 = const(0)
MK_SERVO_S2 = const(1)
MK_SERVO_S3 = const(2)
MK_SERVO_S4 = const(3)

class MotionKit():
    def __init__(self, address=MK_DEFAULT_I2C_ADDRESS):
        self._i2c = SoftI2C(scl=Pin(pin19.pin), sda=Pin(pin20.pin), freq=100000)
        self._addr = address
        self._speeds = [0, 0]

        # check i2c connection
        try:
            who_am_i = self._read_8(MK_REG_WHO_AM_I)
        except OSError:
            who_am_i = 0

        if who_am_i != MK_DEFAULT_I2C_ADDRESS:
            raise RuntimeError("Motion kit module not found. Expected: " + str(address) + ", scanned: " + str(who_am_i))
        else:
            print(who_am_i)
            self.set_motors(MK_MOTOR_ALL, 0)
      
    def fw_version(self):
        minor = self._read_8(MK_REG_FW_VERSION)
        major = self._read_8(MK_REG_FW_VERSION + 1)
        return("{}.{}".format(major, minor))
	
	#################### MOTOR CONTROL ####################

    def set_motors(self, motors, speed):
        self._write_16_array(MK_REG_MOTOR_INDEX, [motors, speed*10])
        
    def stop(self, motors=MK_MOTOR_ALL):
        self.set_motors(motors, 0)

    def brake(self, motors=MK_MOTOR_ALL):
        self._write_8(MK_REG_MOTOR_BRAKE, motors)

    def set_servo(self, index, angle, max=180):
        angle = int(angle*180/max)
        self._write_16(MK_REG_SERVOS[index], angle)
        robocon_servos_pos[index] = angle

    def set_servo_position(pin, next_position, speed=70):        
        if speed < 0:
            speed = 0
        elif speed > 100:
            speed = 100
        
        sleep = int(translate(speed, 0, 100, 100, 0))

        if pin in robocon_servos_pos:
            current_position = robocon_servos_pos[index]
        else:
            current_position = 0
            set_servo(pin, 0) # first time control

        if next_position < current_position:
            for i in range(current_position, next_position, -1):
                set_servo(index, i)
                time.sleep_ms(sleep)
        else:
            for i in range(current_position, next_position):
                set_servo(index, i)
                time.sleep_ms(sleep)

    def move_servo_position(pin, angle):
        if pin in robocon_servos_pos:
            current_position = robocon_servos_pos[index]
        else:
            current_position = 0
        next_position = current_position + angle    
        set_servo(index, next_position)

    #################### I2C COMMANDS ####################

    def _write_8(self, register, data):
        # Write 1 byte of data to the specified  register address.
        self._i2c.writeto_mem(self._addr, register, bytes([data]))

    def _write_8_array(self, register, data):
        # Write multiple bytes of data to the specified  register address.
        self._i2c.writeto_mem(self._addr, register, data)

    def _write_16(self, register, data):
        # Write a 16-bit little endian value to the specified register
        # address.
        self._i2c.writeto_mem(self._addr, register, bytes(
            [data & 0xFF, (data >> 8) & 0xFF]))

    def _write_16_array(self, register, data):
        # write an array of litte endian 16-bit values  to specified register address
        l = len(data)
        buffer = bytearray(2*l)
        for i in range(l):
            buffer[2*i] = data[i] & 0xFF
            buffer[2*i+1] = (data[i] >> 8) & 0xFF
        self._i2c.writeto_mem(self._addr, register, buffer)

    def _read_8(self, register):
        # Read and return a byte from  the specified register address.
        self._i2c.writeto(self._addr, bytes([register]))
        result = self._i2c.readfrom(self._addr, 1)
        return result[0]

    def _read_8_array(self, register, result_array):
        # Read and  saves into result_arrray a sequence of bytes
        # starting from the specified  register address.
        l = len(result_array)
        self._i2c.writeto(self._addr, bytes([register]))
        in_buffer = self._i2c.readfrom(self._addr, l)
        for i in range(l):
            result_array[i] = in_buffer[i]

    def _read_16(self, register):
        # Read and return a 16-bit signed little  endian value  from the
        # specified  register address.
        self._i2c.writeto(self._addr, bytes([register]))
        in_buffer = self._i2c.readfrom(self._addr, 2)
        raw = (in_buffer[1] << 8) | in_buffer[0]
        if (raw & (1 << 15)):  # sign bit is set
            return (raw - (1 << 16))
        else:
            return raw

    def _read_16_array(self, register, result_array):
        # Read and  saves into result_arrray a sequence of 16-bit little  endian
        # values  starting from the specified  register address.
        l = len(result_array)
        self._i2c.writeto(self._addr, bytes([register]))
        in_buffer = self._i2c.readfrom(self._addr, 2*l)
        for i in range(l):
            raw = (in_buffer[2*i+1] << 8) | in_buffer[2*i]
            if (raw & (1 << 15)):  # sign bit is set
                result_array[i] = (raw - (1 << 16))
            else:
                result_array[i] = raw

mk = MotionKit()
'''
# unit test code

while True:
  mk.set_motors(MOTOR_ALL, 100)
  for i in range(4):
    mk.set_servo(i, 0)
  time.sleep(2)
  mk.brake(MOTOR_ALL)
  time.sleep(1)
  mk.set_motors(MOTOR_ALL, 0)
  time.sleep(2)
  mk.set_motors(MOTOR_ALL, -100)
  for i in range(4):
    mk.set_servo(i, 180)
  time.sleep(2)
  mk.brake(MOTOR_ALL)
  time.sleep(1)
  mk.set_motors(MOTOR_ALL, 0)
  time.sleep(2)
 '''
