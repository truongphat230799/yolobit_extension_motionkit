const StemKitColorBlock = '#e65722';
const ImgUrl = 'https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolobit_extension_motion_kit/images/';

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
            "name": "wheel_speed",
            "check": "Number",
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'move.svg',
            "width": 30,
            "height": 30,
            "alt": "*",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "pin",
            "options": [
              ["M1", "2"],
              ["M2", "1"],
              ["M1 + M2", "3"],
            ],
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
  Blockly.Python.definitions_['import_yolo'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_motion_kit_motor'] = 'from motion_kit import *';
  var wheel_speed = Blockly.Python.valueToCode(block, 'wheel_speed', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  // TODO: Assemble Python into code variable.
  var code = "mk.set_motors(" + dropdown_pin + ", " + wheel_speed + ")\n";
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
          "type": "field_dropdown",
          "name": "action",
          "options": [
            [Blockly.Msg.BLOCK_MOTIONKIT_STOP, ".stop("],
            [Blockly.Msg.BLOCK_MOTIONKIT_BRAKE, ".brake("],
          ],
        },
        {
          "type": "field_dropdown",
          "name": "pin",
          "options": [
            ["M1", "2"],
            ["M2", "1"],
            ["M1 + M2", "3"],
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
  Blockly.Python.definitions_['import_yolo'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_motion_kit_motor'] = 'from motion_kit import *';
  var dropdown_action = block.getFieldValue('action');
  var dropdown_pin = block.getFieldValue('pin');
  // TODO: Assemble Python into code variable.
  var code = "mk" + dropdown_action + dropdown_pin +")\n";
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
            ["MS1", "0"],
            ["MS2", "1"],
            ["MS3", "2"],
            ["MS4", "3"],
          ],
        },
        {
          "type": "field_image",
          "src": ImgUrl + 'servo.png',
          "width": 30,
          "height": 30,
          "alt": "*",
          "flipRtl": false
        },
        { type: "input_value", name: "speed", check: "Number" },
        {type: "input_dummy"},
        {type: "input_dummy"},
      ],
      helpUrl: null,
    });
  },
};

Blockly.Python['motionkit_servo_write_angle'] = function (block) {
  Blockly.Python.definitions_['import_yolo'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_motion_kit_motor'] = 'from motion_kit import *';
  var value_output = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  var code = "mk.set_servo_position("+ dropdown_pin + "," + value_output +", "+ value_speed+ ")\n";
  return code;
  
};


Blockly.Blocks["motionkit_servo_micro_angle"] = {
  init: function () {
    this.jsonInit({
      colour: StemKitColorBlock,
      nextStatement: null,
      message0: Blockly.Msg.BLOCK_MOTIONKIT_SERVO_WRITE_MICRO_MESSAGE0,
      tooltip: Blockly.Msg.BLOCK_MOTIONKIT_SERVO_WRITE_MICRO_TOOLTIP,
      previousStatement: null,
      args0: [
        {
          "type": "input_value",
          "name": "angle",
          "check": "Number"
        },
        {
          "type": "field_dropdown",
          "name": "pin",
          "options": [
            ["MS1", "0"],
            ["MS2", "1"],
            ["MS3", "2"],
            ["MS4", "3"],
          ],
        },
        {
          "type": "field_image",
          "src": ImgUrl + 'servo.png',
          "width": 30,
          "height": 30,
          "alt": "*",
          "flipRtl": false
        },        
        {type: "input_dummy"},
      ],
      helpUrl: null,
    });
  },
};

Blockly.Python['motionkit_servo_micro_angle'] = function (block) {
  Blockly.Python.definitions_['import_yolo'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_motion_kit_motor'] = 'from motion_kit import *';
  var value_output = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  var code = "mk.move_servo_position("+ dropdown_pin + "," + value_output + ")\n";
  return code;
  
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
              ["MS1", "0"],
              ["MS2", "1"],
              ["MS3", "2"],
              ["MS4", "3"],
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
  Blockly.Python.definitions_['import_yolo'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_motion_kit_motor'] = 'from motion_kit import *';
  var value_output = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  var code = "mk.set_servo("+ dropdown_pin + "," + value_output + ")\n";
  return code;
};
