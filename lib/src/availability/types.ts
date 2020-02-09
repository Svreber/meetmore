import {Date} from '../types';
import {DateAvailability} from './DateAvailability';
import {ParticipantAvailability} from './ParticipantAvailability';

export type DateAvailabilities = Record<Date, DateAvailability>;
export type ParticipantsAvailabilities = Record<Date, Array<ParticipantAvailability>>;