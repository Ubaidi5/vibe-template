/**
 * Simple example of using the email template framework
 *
 * This demonstrates how the components would be used if we had
 * a JSX-like compilation step (which we'll implement next)
 */

// This is pseudocode to illustrate what the JSX would look like
// In a complete implementation, this would be transpiled by Babel or similar
/*
import { Email, Row, Column, Text, Image } from '../src/components';

const WelcomeTemplate = (props) => {
  const { userName, userAvatar } = props;
  
  return (
    <Email 
      title="Welcome to Our Service" 
      previewText={`Hi ${userName}, welcome to our service!`}
    >
      <Row>
        <Column>
          <Text size="24px" weight="bold" align="center" color="#333333">
            Welcome, {userName}!
          </Text>
        </Column>
      </Row>
      
      <Row style={{ marginTop: '20px' }}>
        <Column>
          <Image 
            src={userAvatar || 'https://via.placeholder.com/150'} 
            alt={`${userName}'s avatar`} 
            width="150" 
            height="150" 
            style={{ margin: '0 auto' }}
          />
        </Column>
      </Row>
      
      <Row style={{ marginTop: '20px' }}>
        <Column span={12} sm={24}>
          <Text>
            Thank you for signing up to our service. We're excited to have you on board!
          </Text>
        </Column>
        <Column span={12} sm={24}>
          <Text>
            Get started by clicking the button below to complete your profile.
          </Text>
        </Column>
      </Row>
    </Email>
  );
};

export default WelcomeTemplate;
*/

// For now, let's show how the components would be used directly in JS
// This is what our compilation process would eventually generate

const { Email, Row, Column, Text, Image } = require("../src/components");

function createWelcomeEmail(props = {}) {
  const { userName = "User", userAvatar } = props;

  // Create the root email component
  const email = new Email({
    title: "Welcome to Our Service",
    previewText: `Hi ${userName}, welcome to our service!`,
  });

  // Header row with welcome text
  const headerRow = new Row();
  const headerColumn = new Column();

  const welcomeText = new Text({
    size: "24px",
    weight: "bold",
    align: "center",
    color: "#333333",
  });
  welcomeText.addChild(`Welcome, ${userName}!`);

  headerColumn.addChild(welcomeText);
  headerRow.addChild(headerColumn);
  email.addChild(headerRow);

  // Avatar row
  const avatarRow = new Row({
    style: { marginTop: "20px" },
  });
  const avatarColumn = new Column();

  const avatar = new Image({
    src: userAvatar || "https://via.placeholder.com/150",
    alt: `${userName}'s avatar`,
    width: 150,
    height: 150,
    style: { margin: "0 auto" },
  });

  avatarColumn.addChild(avatar);
  avatarRow.addChild(avatarColumn);
  email.addChild(avatarRow);

  // Content row with two columns
  const contentRow = new Row({
    style: { marginTop: "20px" },
  });

  const contentColumnLeft = new Column({
    span: 12,
    sm: 24,
  });

  const contentLeftText = new Text();
  contentLeftText.addChild(
    "Thank you for signing up to our service. We're excited to have you on board!"
  );
  contentColumnLeft.addChild(contentLeftText);

  const contentColumnRight = new Column({
    span: 12,
    sm: 24,
  });

  const contentRightText = new Text();
  contentRightText.addChild(
    "Get started by clicking the button below to complete your profile."
  );
  contentColumnRight.addChild(contentRightText);

  contentRow.addChild(contentColumnLeft);
  contentRow.addChild(contentColumnRight);
  email.addChild(contentRow);

  // Return the rendered HTML
  return email.render();
}

// In a real application, we would use this function to generate the email HTML
// console.log(createWelcomeEmail({ userName: 'John', userAvatar: 'https://example.com/avatar.jpg' }));

module.exports = createWelcomeEmail;
