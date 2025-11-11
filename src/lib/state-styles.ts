// Challenge and event state styling utilities

export const stateStyles = {
  // Challenge states
  challenge: {
    solved: {
      border: 'border-lime-600/50',
      bg: 'bg-lime-900/10',
      text: 'text-lime-300',
      badge: 'bg-lime-900/30 text-lime-300 border-lime-500/30',
    },
    attempted: {
      border: 'border-yellow-600/50',
      bg: 'bg-yellow-900/10',
      text: 'text-yellow-300',
      badge: 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30',
    },
    unsolved: {
      border: 'border-slate-600/50',
      bg: 'bg-slate-800/10',
      text: 'text-slate-300',
      badge: 'bg-slate-800/30 text-slate-300 border-slate-600/30',
    },
    locked: {
      border: 'border-slate-700/50',
      bg: 'bg-slate-900/10',
      text: 'text-slate-500',
      badge: 'bg-slate-900/30 text-slate-500 border-slate-700/30',
    },
  },

  // Event states
  event: {
    ongoing: {
      border: 'border-lime-600/50',
      bg: 'bg-lime-900/10',
      text: 'text-lime-300',
      badge: 'bg-lime-900/30 text-lime-300 border-lime-500/30',
    },
    upcoming: {
      border: 'border-blue-600/50',
      bg: 'bg-blue-900/10',
      text: 'text-blue-300',
      badge: 'bg-blue-900/30 text-blue-300 border-blue-500/30',
    },
    ended: {
      border: 'border-slate-600/50',
      bg: 'bg-slate-800/10',
      text: 'text-slate-400',
      badge: 'bg-slate-800/30 text-slate-400 border-slate-600/30',
    },
    registrationClosed: {
      border: 'border-orange-600/50',
      bg: 'bg-orange-900/10',
      text: 'text-orange-300',
      badge: 'bg-orange-900/30 text-orange-300 border-orange-500/30',
    },
  },

  // Action states
  action: {
    enabled: {
      bg: 'bg-lime-400 hover:bg-lime-500',
      text: 'text-slate-900',
      cursor: 'cursor-pointer',
    },
    disabled: {
      bg: 'bg-slate-700',
      text: 'text-slate-500',
      cursor: 'cursor-not-allowed opacity-50',
    },
    loading: {
      bg: 'bg-blue-600 opacity-75',
      text: 'text-white',
      cursor: 'cursor-wait',
    },
  },

  // Difficulty levels
  difficulty: {
    সহজ: {
      bar: 'bg-gradient-to-r from-green-400 to-green-500',
      text: 'text-green-400',
      bg: 'bg-green-900/20',
      border: 'border-green-600/30',
    },
    মধ্যম: {
      bar: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
      text: 'text-yellow-400',
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-600/30',
    },
    কঠিন: {
      bar: 'bg-gradient-to-r from-orange-400 to-orange-500',
      text: 'text-orange-400',
      bg: 'bg-orange-900/20',
      border: 'border-orange-600/30',
    },
    অসম্ভব: {
      bar: 'bg-gradient-to-r from-red-400 to-red-500',
      text: 'text-red-400',
      bg: 'bg-red-900/20',
      border: 'border-red-600/30',
    },
  },

  // Category colors
  category: {
    ওয়েব: {
      bg: 'bg-blue-900/20',
      text: 'text-blue-400',
      border: 'border-blue-600/30',
    },
    ক্রিপ্টোগ্রাফি: {
      bg: 'bg-cyan-900/20',
      text: 'text-cyan-400',
      border: 'border-cyan-600/30',
    },
    ফরেনসিক্স: {
      bg: 'bg-orange-900/20',
      text: 'text-orange-400',
      border: 'border-orange-600/30',
    },
    রিভার্স: {
      bg: 'bg-pink-900/20',
      text: 'text-pink-400',
      border: 'border-pink-600/30',
    },
    পাওয়্যন্স: {
      bg: 'bg-indigo-900/20',
      text: 'text-indigo-400',
      border: 'border-indigo-600/30',
    },
  },
};

export type ChallengeState = keyof typeof stateStyles.challenge;
export type EventState = keyof typeof stateStyles.event;
export type ActionState = keyof typeof stateStyles.action;
