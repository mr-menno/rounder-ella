import React, { useState , useEffect , useRef } from 'react';

import {
  Container,
  Segment,
  Input,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';



function Subtraction() {

  let newQuestion = () => {
    let A = Math.ceil(Math.random()*21)-1;
    let options = [-0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10];
    let B = options[Math.floor(Math.random()*options.length)];
    let question = `${A} - ${B*-1}`;
    let answer = A+B;
    if(answer<0) return newQuestion();
    
    let r_question = {
      A: A,
      B: B,
      question: question,
      answer: answer,
      outcome: -1,
      timeout: 15
    };
    
    return r_question;
  }
 
  let [question,setQuestion] = useState(newQuestion())
  let [answer,setAnswer] = useState('');
  let [answered,setAnswered] = useState(false);
  let [result,setResult] = useState(false);
  let [stats,setStats] = useState({questions:0,correct:0,wrong:0});
  let questionRef = useRef(question);
  questionRef.current = question;

  let checkQuestion = () => {
    setAnswered(true);
    if(parseInt(answer)===question.answer) {
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0})
        setStats({...stats,correct:stats.correct+1,questions:stats.questions+1});
      }
      setResult(true)
      setTimeout(() => {
        setAnswered(false);
        setAnswer('');
        setQuestion(newQuestion());
      },1000)
    } else {
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0});
        setStats({...stats,wrong:stats.wrong+1,questions:stats.questions+1});
      }
      setResult(false);
      setTimeout(() => {
        setAnswer('');
        setAnswered(false);
      },1000)
    }
    // setQuestion(newQuestion());
  }
  let checkQuestionRef = useRef(checkQuestion);
  checkQuestionRef.current = checkQuestion;
  
  useEffect(() => {
    const timer = setInterval(() => {
      let old_timeout = questionRef.current.timeout;
      let new_timeout = old_timeout - 1;
      if(new_timeout<0) new_timeout=0;
      setQuestion({...questionRef.current,timeout:new_timeout});
      if(old_timeout > 0 && new_timeout==0) {
        setImmediate(checkQuestionRef.current);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  
  return (

    <Container>
        <Segment>
          <h3>subtraction</h3>
        </Segment>
        <Segment>
          <h1>{question.question}</h1>
        </Segment>
        <Input type="number" pattern="\d*" value={answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={(e,data) => {
            setAnswer(data.value.replace(/,/g,''));
            // if(parseInt(data.value)===question.answer) {
            //   console.log(data.value,question.answer);
            //   checkQuestion(data.value);
            // }
          }}
          placeholder='answer' fluid size="massive" focus={true} className="number-input"/>
        {answered ? (result ? <Message
          positive
          header='Nice work!'
        /> : <Message
          negative
          header='Try again' />) :
        <Button className='mt-1em mb-1em' fluid color="green" onClick={checkQuestion} size="huge">{question.timeout>0 ? "checking in "+question.timeout+" s." : "check now"}</Button>}
        <Button.Group fluid className='mt-1em' >
          <Button primary icon labelPosition='left'>{stats.questions}<Icon name='hashtag' /></Button>
          <Button positive icon labelPosition='left'>{stats.correct}<Icon name='check' /></Button>
          <Button negative icon labelPosition='left'>{stats.wrong}<Icon name='close' /></Button>
        </Button.Group>
    </Container>
  );
}

export default Subtraction;
