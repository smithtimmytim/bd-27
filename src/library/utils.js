/**
 * Utilities
 * - a bunch of helper functions so that I don't
 *   have to remember how to do stuff
 */

import { request } from 'undici';
import { rando } from '@nastyox/rando.js';
import { catEmoji } from './lists.js';

/**
 * Stylized logs for the Console
 *
 * @param  {...any} content Content to Log
 * @returns
 */
export const botLog = ( ...content ) => console.log( '🤖💬' , ...content );

/**
 * Get a random number
 *
 * @param {integer} maxValue the max value
 * @returns {integer} the random number
 */
export const getRandomNum = ( maxValue ) => Number( rando( 0, maxValue - 1 ) );

/**
 * Make API calls easier for me
 *
 * @param {string} apiEndpoint The API endpoint
 * @returns
 */
export const makeApiCall = async ( apiEndpoint ) => {

  try {
    const { statusCode, body } = await request( apiEndpoint );

    if ( !statusCode === 200 ) return;

    const data = await body.json();

    return data;

  } catch ( error ) {
    console.error( error );
  }
}

/**
 * Get a Random Cat Emoji
 */
export const getRandomCatEmoji = () => {
  const randomCat = getRandomNum( catEmoji.length );
  return catEmoji[randomCat];
}

/**
 * Normalize Content
 *
 * @param {object} msg the message
 * @returns normalized content
 */
export const normalizeMsgContent = ( msg ) => msg.content.toLowerCase().trim();

/**
 * Message Includes Exact Word
 *
 * @param {object} message the message
 * @param {string} word the word to find
 * @returns {boolean}
 */
export const messageIncludesWord = ( message, word ) =>
  normalizeMsgContent( message ).includes( word );

/**
 * Message Includes Words
 *
 * @param {object} message the message
 * @param {Array} wordsArray the array of words to find
 * @returns {boolean} the result
 */
export const messageIncludesWords = ( message, wordsArray ) => {

  let wordMatched = false;

  wordsArray.forEach( ( word ) => {
    if ( !wordMatched && messageIncludesWord( message, word ) )
      wordMatched = true;

  } );

  return wordMatched;
};

