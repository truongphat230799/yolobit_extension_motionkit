const StemKitColorBlock = '#717171';
const ImgUrl = 'https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolobit_extension_stem_starterkit/images/';

Blockly.Blocks['motionkit_move_motor'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "motionkit_move_motor",
        "message0": Blockly.Msg.BLOCK_MOTIONKIT_MOVE_MOTOR_MESSAGE0,
        "tooltip": Blockly.Msg.BLOCK_MOTIONKIT_MOVE_MOTOR_TOOLTIP,
        "args0": [
          {
            "type": "input_value",
            "name": "left_wheel_speed",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "right_wheel_speed",
            "check": "Number",
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'move.svg',
            "width": 30,
            "height": 30,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": StemKitColorBlock,
      }
    );
  }
};

Blockly.Python["motionkit_move_motor"] = function (block) {
  Blockly.Python.definitions_['import_motion_kit_motor'] = 'from motion_kit import *';
  var left_wheel_speed = Blockly.Python.valueToCode(block, 'left_wheel_speed', Blockly.Python.ORDER_ATOMIC);
  var right_wheel_speed = Blockly.Python.valueToCode(block, 'right_wheel_speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "mk.set_motors(1, " + left_wheel_speed + ")\n" + "mk.set_motors(2, " + right_wheel_speed + ")\n";
  return code;
};

Blockly.Blocks['motionkit_stop'] = {
  init: function () {
    this.jsonInit({
      "type": "motionkit_stop",
      "message0": Blockly.Msg.BLOCK_MOTIONKIT_STOP_MESSAGE0,
      "tooltip": Blockly.Msg.BLOCK_MOTIONKIT_STOP_TOOLTIP,
      "args0": [
        {
          "type": "field_image",
          "src": ImgUrl + 'stop.svg',
          "width": 30,
          "height": 30,
          "alt": "",
          "flipRtl": false
        },
        {
          type: "field_dropdown",
          name: "pin",
          options: [
            [Blockly.Msg.BLOCK_MOTIONKIT_STOP, "mk.stop()\n"],
            [Blockly.Msg.BLOCK_MOTIONKIT_BRAKE, "mk.brake()n"],
          ],
        }
        ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": StemKitColorBlock,
    });
  }
};

Blockly.Python["motionkit_stop"] = function (block) {
  Blockly.Python.definitions_['import_motionkit_motor'] = 'from motion_kit import *';
  var dropdown_action = block.getFieldValue('pin');
  // TODO: Assemble Python into code variable.
  var code = dropdown_action;
  return code;
};

Blockly.Blocks["motionkit_servo_write_angle"] = {
  init: function () {
    this.jsonInit({
      colour: StemKitColorBlock,
      nextStatement: null,
      message0: Blockly.Msg.BLOCK_MOTIONKIT_SERVO_WRITE_MESSAGE0,
      tooltip: Blockly.Msg.BLOCK_MOTIONKIT_SERVO_WRITE_TOOLTIP,
      previousStatement: null,
      args0: [
        { type: "input_value", name: "angle", check: "Number" },
        {
          type: "field_dropdown",
          name: "pin",
          options: [
            ["MS1", "1"],
            ["MS2", "2"],
            ["MS3", "3"],
            ["MS4", "4"],
          ],
        },
        {
          "type": "field_image",
          "src": ImgUrl + 'servo.png',
          "width": 30,
          "height": 30,
          "alt": "*",
          "flipRtl": false
        }
      ],
      helpUrl: null,
    });
  },
};

Blockly.Python['motionkit_servo_write_angle'] = function (block) {
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  var value_output = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  return code = 'mk.set_servo('+ dropdown_pin + ',' + value_output + ')\n';
  
};

Blockly.Blocks['motionkit_servo360_write'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "motionkit_servo360_write",
        "message0": Blockly.Msg.BLOCK_MOTIONKIT_SERVO360_WRITE_MESSAGE0,
        "tooltip": Blockly.Msg.BLOCK_MOTIONKIT_SERVO360_WRITE_TOOLTIP,
        "args0": [
          {
            type: "field_dropdown",
            name: "pin",
            options: [
              ["MS1", "1"],
              ["MS2", "2"],
              ["MS3", "3"],
              ["MS4", "4"],
            ],
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number"
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'servo.png',
            "width": 30,
            "height": 30,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        colour: StemKitColorBlock
      }
    );
  }
};

Blockly.Python['motionkit_servo360_write'] = function (block) {
  Blockly.Python.definitions_['import_motionkit'] = 'from motion_kit import *';
  var value_output = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  return code = 'mk.set_servo('+ dropdown_pin + ',' + value_output + ')\n';
};
