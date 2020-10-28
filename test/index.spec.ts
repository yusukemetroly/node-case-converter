import { describe } from 'mocha'
import * as chai from 'chai'
import { snakeCase, camelCase, matchTargetKeys } from '../src/index'

const assert = chai.assert
const expect = chai.expect

describe('object-manipulator', () => {
  it('should reduce the keys to match the taret', () => {
    const targetObject = {
      a: 1,
      c: {
        c1: 1,
        c3: {
          c32: 1
        },
        c4: [1],
        c5: ['a'],
        c6: [
          {
            c61: 1,
            c63: 1,
          }
        ]
      },
      d: 'a'
    }

    const inputObject = {
      a: 1,
      b: 1, // remove
      c: {
        c1: 1,
        c2: 2, // remove
        c3: { // remove because childless
          c31: 1 // remove
        },
        c4: [1, 2, 3],
        c5: [1, 2, 3], // remove because different type
        c6: [
          {
            c61: 1,
            c62: 2, // remove
            c63: 'a'// remove because different type
          },
          {
            c61: 1,
            c62: 2, // remove
            c63: 'a'// remove because different type
          }
        ]
      },
      d: 1 // remove because different type
    }

    const matchedObject: any = matchTargetKeys(targetObject, inputObject)
    // console.log(JSON.stringify(matchedObject))
    expect(matchedObject['a']).to.equal(1)
    expect(matchedObject['b']).to.equal(undefined)
    expect(matchedObject['c']['c1']).to.equal(1)
    expect(matchedObject['c']['c2']).to.equal(undefined)
    expect(matchedObject['c']['c4']).to.be.instanceOf(Array)
    expect(matchedObject['c']['c5']).to.equal(undefined)
    expect(matchedObject['c']['c6'][0]['c61']).to.equal(1)
    expect(matchedObject['c']['c6'][0]['c62']).to.equal(undefined)
    expect(matchedObject['c']['c6'][0]).to.not.have.property('c63')
    expect(matchedObject['c']).to.not.have.property('c5')
    expect(matchedObject['c']).to.not.have.property('c3')
    expect(matchedObject).to.not.have.property('d')
  })

  it('should matchTargetKeys from calendar raw input properly', () => {

    const target = {
      "status": "status",
      "organizer": {
        "displayName": "displayName",
        "email": "email",
        "self": true
      },
      "created": "created",
      "description": "description",
      "privateCopy": true,
      "attendees": [
        {
          "resource": true,
          "comment": "comment",
          "additionalGuests": 1,
          "optional": true,
          "organizer": true,
          "responseStatus": "responseStatus",
          "displayName": "displayName",
          "self": true,
          "email": "email"
        }
      ],
      "operation": "operation",
      "source": {
        "url": "url",
        "title": "title"
      },
      "recurringEventId": "recurringEventId",
      "iCalUID": "iCalUID",
      "htmlLink": "htmlLink",
      "etag": "etag",
      "visibility": "visibility",
      "start": {
        "timeZone": "timeZone",
        "dateTime": "dateTime",
        "date": "date"
      },
      "updated": "updated",
      "kind": "kind",
      "sequence": 1,
      "guestsCanInviteOthers": true,
      "originalStartTime": {
        "dateTime": "dateTime",
        "date": "date",
        "timeZone": "timeZone"
      },
      "summary": "summary",
      "transparency": "transparency",
      "location": "location",
      "reminders": {
        "useDefault": true,
        "overrides": [
          {
            "minutes": 1,
            "method": "method"
          }
        ]
      },
      "hangoutLink": "hangoutLink",
      "guestsCanModify": true,
      "id": "id",
      "creator": {
        "displayName": "displayName",
        "email": "email",
        "self": true
      },
      "conferenceData": {
        "createRequest": {
          "conferenceSolutionKey": {
            "type": "type"
          },
          "requestId": "requestId",
          "status": {
            "statusCode": "statusCode"
          }
        },
        "signature": "signature",
        "conferenceSolution": {
          "name": "name",
          "key": {
            "type": "type"
          },
          "iconUri": "iconUri"
        },
        "notes": "notes",
        "conferenceId": "conferenceId",
        "entryPoints": [
          {
            "regionCode": "regionCode",
            "entryPointType": "entryPointType",
            "pin": 1,
            "meetingCode": 1,
            "label": "label",
            "uri": "uri",
            "password": "password"
          }
        ],
        "parameters": {
          "addOnParameters": {
            "parameters": {
              "meetingCreatedBy": "meetingCreatedBy",
              "meetingUuid": "meetingUuid",
              "meetingType": 1,
              "realMeetingId": 1,
              "scriptId": "scriptId"
            }
          }
        }
      },
      "attachments": [
        {
          "fileUrl": "fileUrl",
          "title": "title",
          "iconLink": "iconLink",
          "mimeType": "mimeType",
          "fileId": "fileId"
        }
      ],
      "end": {
        "timeZone": "timeZone",
        "date": "date",
        "dateTime": "dateTime"
      },
      "guestsCanSeeOtherGuests": true,
      "user": "user"
    }

    const rawInput = {
      "attendees": [
        {
          "responseStatus": "needsAction",
          "displayName": "John Example",
          "email": "john@example.com"
        },
        {
          "email": "john@example.com",
          "responseStatus": "accepted",
          "organizer": true,
          "self": true
        }
      ],
      "id": "04c4p6ul4bfqssclhmrnkte4pj",
      "organizer": {
        "email": "john@example.com",
        "self": true
      },
      "reminders": {
        "useDefault": true
      },
      "hangoutLink": "https://meet.google.com/sdf-miim-vxu",
      "start": {
        "dateTime": "2020-10-26T05:45:00+09:00"
      },
      "summary": "testaaaaa",
      "sequence": 1,
      "status": "confirmed",
      "created": "2020-10-28T06:11:44.000Z",
      "creator": {
        "self": true,
        "email": "john@example.com"
      },
      "end": {
        "dateTime": "2020-10-26T06:45:00+09:00"
      },
      "iCalUID": "04c4p6ul4bfqssclhmrnkte4pj@google.com",
      "updated": "2020-10-28T06:24:25.806Z",
      "conferenceData": {
        "conferenceSolution": {
          "key": {
            "type": "hangoutsMeet"
          },
          "iconUri": "https://lh5.googleusercontent.com/proxy/bWvYBOb7O03a7HK5iKNEAPoUNPEXH1CHZjuOkiqxHx8OtyVn9sZ6Ktl8hfqBNQUUbCDg6T2unnsHx7RSkCyhrKgHcdoosAW8POQJm_ZEvZU9ZfAE7mZIBGr_tDlF8Z_rSzXcjTffVXg3M46v",
          "name": "Google Meet"
        },
        "entryPoints": [
          {
            "uri": "https://meet.google.com/sdf-miim-vxu",
            "label": "meet.google.com/sdf-miim-vxu",
            "entryPointType": "video"
          },
          {
            "uri": "https://tel.meet/sdf-miim-vxu?pin=6828663969965",
            "entryPointType": "more",
            "pin": "6828663969965"
          },
          {
            "label": "+81 50-1700-8008",
            "uri": "tel:+81-50-1700-8008",
            "entryPointType": "phone",
            "pin": "6828663969965",
            "regionCode": "JP"
          }
        ],
        "conferenceId": "sdf-miim-vxu",
        "signature": "AGkP/s2BNBKkGrd92JbuA0WcTkPJ"
      },
      "kind": "calendar#event",
      "htmlLink": "https://www.google.com/calendar/event?eid=MDRjNHA2dWw0YmZxc3NjbGhtcm5rdGU0cGogeXVzdWtlQG1ldHJvbHkuaW8",
      "etag": "\"3207732531612000\""
    }


    const matchedObject: any = matchTargetKeys(target, rawInput)

    matchedObject.conferenceData.entryPoints.forEach((element: any) => {
      expect(element).to.not.equal(null)
    });
  })




})

describe('case-converter', () => {
  it('should convert case to snake case', () => {

    const camelObject = {
      myKey1: 1,
      myKey2: {
        myKey3: 4
      },
      myKey4: [1, 3, 4, 5],
      myKey5: [
        { myKey6: 1 },
        { myKey6: 2 },
        { myKey6: 3 },
      ]
    }

    const snakeObject = snakeCase(camelObject)
    expect(snakeObject['my_key_1']).to.equal(1)
    expect(snakeObject['my_key_2']['my_key_3']).to.equal(4)
    expect(snakeObject['my_key_4'][0]).to.equal(1)
    expect(snakeObject['my_key_5'][0]['my_key_6']).to.equal(1)
  })

  it('should convert case to camel case', () => {

    const snakeObject = {
      my_key_1: 1,
      my_key_2: {
        my_key_3: 4
      },
      my_key_4: [1, 3, 4, 5],
      my_key_5: [
        { my_key_6: 1 },
        { my_key_6: 2 },
        { my_key_6: 3 },
      ]
    }

    const camelObject = camelCase(snakeObject)
    expect(camelObject['myKey1']).to.equal(1)
    expect(camelObject['myKey2']['myKey3']).to.equal(4)
    expect(camelObject['myKey4'][0]).to.equal(1)
    expect(camelObject['myKey5'][0]['myKey6']).to.equal(1)
  })

})
