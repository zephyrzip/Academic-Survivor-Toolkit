import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateAttendanceMetrics, getStatusTone } from './attendanceUtils.js'

test('calculateAttendanceMetrics derives progress from attended and missed classes', () => {
  const metrics = calculateAttendanceMetrics({ attended: 18, missed: 2, total: 20, target: 85 })

  assert.equal(metrics.percentage, 90)
  assert.equal(metrics.attended, 18)
  assert.equal(metrics.missed, 2)
  assert.equal(metrics.total, 20)
  assert.equal(metrics.classesNeeded, 4)
  assert.equal(metrics.classesCanMiss, 7)
})

test('getStatusTone returns the expected palette for attendance values', () => {
  assert.equal(getStatusTone(91), 'good')
  assert.equal(getStatusTone(82), 'warning')
  assert.equal(getStatusTone(65), 'danger')
})
