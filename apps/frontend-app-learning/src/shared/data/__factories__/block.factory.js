import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

Factory.define('block')
  .option('courseId', 'course-v1:edX+DemoX+Demo_Course')
  .option('host', 'http://localhost:18000')
  // Generating block_id that is similar to md5 hash, but still deterministic
  .sequence('block_id', id => ('abcd'.repeat(8) + id).slice(-32))
  .attrs({
    complete: false,
    description: null,
    due: null,
    graded: false,
    icon: null,
    showLink: true,
    type: 'course',
    children: [],
  })
  .attr('display_name', ['display_name', 'block_id'], (displayName, blockId) => {
    if (displayName) {
      return displayName;
    }

    return blockId;
  })
  .attr(
    'id',
    ['id', 'block_id', 'type', 'courseId'],
    (id, blockId, type, courseId) => {
      if (id) {
        return id;
      }

      const courseInfo = courseId.split(':')[1];

      return `block-v1:${courseInfo}+type@${type}+block@${blockId}`;
    },
  )
  .attr(
    'student_view_url',
    ['student_view_url', 'host', 'id'],
    (url, host, id) => {
      if (url) {
        return url;
      }

      return `${host}/xblock/${id}`;
    },
  )
  .attr(
    'legacy_web_url',
    ['legacy_web_url', 'host', 'courseId', 'id'],
    (url, host, courseId, id) => {
      if (url) {
        return url;
      }

      return `${host}/courses/${courseId}/jump_to/${id}?experience=legacy`;
    },
  );
