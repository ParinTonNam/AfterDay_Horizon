// The original guide PNGs contain Thai text. Show equivalent English guides
// when the web game is entered from the English presentation.
if (document.documentElement.lang === 'en') {
  window.gameEnglishManuals = {
    'info/how_elec.png': {
      title: 'Repairing the electrical system',
      steps: [
        'Ask the VR player to go to the electrical system.',
        'Open the electrical control panel on the website.',
        'Ask the VR player which switch is flashing.',
        'Press the matching switch on your panel.',
        'Tell the VR player which indicator is flashing on your panel.',
        'The VR player presses that switch on their panel.',
        'Repeat until all five indicators turn green. Share the event code with the VR player.'
      ]
    },
    'info/how_water.png': {
      title: 'Repairing the water supply',
      steps: [
        'Ask the VR player to go to the water supply system.',
        'Open the water supply unit on the website.',
        'Ask the VR player to rotate the pipes into one connected line, from the source to the end.',
        'If a red pipe is locked, ask the VR player where it is.',
        'Select that pipe position on the website.',
        'Use the code clues to find the correct four-digit code and tell the VR player.',
        'The VR player enters the code on the water supply unit to unlock the pipe.',
        'Keep rotating pipes until they connect. Share the event code with the VR player.'
      ]
    },
    'info/how_oxy.png': {
      title: 'Repairing the oxygen system',
      steps: [
        'Ask the VR player to go to the oxygen machine.',
        'Ask which parts are needed for the repair.',
        'Find the corresponding part files in the web folders.',
        'Tell the VR player where each part is shown.',
        'If you need more keys, play the Key Unlock System minigame.',
        'Ask the VR player to pick up the part at the location you describe.',
        'The VR player brings each part back to the machine.',
        'Once every part is installed, share the event code with the VR player.'
      ]
    },
    'info/guide_water1.png': {
      title: 'Selecting a water pipe',
      steps: [
        'The water supply screen shows the pipe grid between Start and End.',
        'Ask the VR player which pipe needs to be unlocked.',
        'Select the matching position in the grid. The highlighted tile marks the selected pipe.'
      ]
    },
    'info/guide_water2.png': {
      title: 'Finding the pipe code',
      steps: [
        'The grid highlights the pipe you are checking.',
        'Use the four digit controls below the grid to test a code.',
        'Green means the digit and its position are correct.',
        'Yellow means the digit is correct but in the wrong position.',
        'Red means the digit is not in the code.',
        'Use the clues to find the code and tell the VR player.'
      ]
    },
    'info/guide_elec.png': {
      title: 'Reading the electrical panel',
      steps: [
        'The five lights at the top show how many switches still need attention.',
        'Find the flashing switch in the grid and share its position with your partner.',
        'Press the matching switch after comparing both players’ panels.',
        'Use Reset to start again if needed.',
        'Finish before the countdown reaches zero.'
      ]
    },
    'info/guide_key.png': {
      title: 'Earning an access key',
      steps: [
        'Open the Key Unlock System to play a short minigame.',
        'Use the question mark button if you need help with its rules.',
        'Win the minigame before time runs out to earn one key.',
        'Use keys to unlock files in the folders.'
      ]
    },
    'info/Tutorial 6.png': {
      title: 'Files and parts',
      steps: [
        'Open the folders on the desktop to find notes and part files.',
        'Notes provide clues for the web operator.',
        'Part files show items and locations that the VR player needs.',
        'Share what you find with your partner as you explore the bunker.'
      ]
    }
  };
}
